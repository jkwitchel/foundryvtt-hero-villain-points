class HeroVillainTracker extends Application {
    constructor(options = {}) {
        super(options);
        this.position = game.settings.get("hero-villain-points", "position") || { left: 100, top: 100 };
    }

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "hero-villain-tracker",
            title: "Hero vs. Villain Points",
            template: "modules/hero-villain-points/templates/ui.html",
            popOut: true,
            resizable: false,
            width: 300,
            height: "auto"
        });
    }

    getData() {
        let points = game.settings.get("hero-villain-points", "pointPool");
        let circles = [];

        for (let i = 0; i < 7; i++) {
            circles.push({
                index: i,
                type: i < points.hero ? "hero" : "villain",
                color: i < points.hero ? "silver" : "midnightblue"
            });
        }

        return { circles, isGM: game.user.isGM };
    }

    activateListeners(html) {
        super.activateListeners(html);

        if (game.user.isGM) {
            html.find(".point-circle").click((event) => {
                const index = parseInt(event.currentTarget.dataset.index);
                this.flipPoint(index);
            });

            html.find("#configure-button").show().click(() => this.openConfigDialog());
        } else {
            html.find("#configure-button").hide();
        }
    }

    flipPoint(index) {
        let points = game.settings.get("hero-villain-points", "pointPool");

        if (index < points.hero) {
            points.hero--;
            points.villain++;
        } else {
            points.hero++;
            points.villain--;
        }

        game.settings.set("hero-villain-points", "pointPool", points);
        game.socket.emit("module.hero-villain-points", { action: "sync", pool: points });
        ui.heroVillainTracker.render();
    }

    openConfigDialog() {
        if (!game.user.isGM) return;

        new Dialog({
            title: "Configure Hero/Villain Points",
            content: `
                <form>
                    <div class="form-group">
                        <label>Hero Points:</label>
                        <input type="number" id="hero-points-input" value="${game.settings.get("hero-villain-points", "pointPool").hero}" min="0" max="7">
                    </div>
                    <div class="form-group">
                        <label>Villain Points:</label>
                        <input type="number" id="villain-points-input" value="${game.settings.get("hero-villain-points", "pointPool").villain}" min="0" max="7">
                    </div>
                </form>
            `,
            buttons: {
                save: {
                    label: "Save",
                    callback: (html) => {
                        let heroPoints = parseInt(html.find("#hero-points-input").val());
                        let villainPoints = parseInt(html.find("#villain-points-input").val());

                        if (heroPoints + villainPoints !== 7) {
                            ui.notifications.warn("Total must be exactly 7.");
                            return;
                        }

                        game.settings.set("hero-villain-points", "pointPool", { hero: heroPoints, villain: villainPoints });
                        game.socket.emit("module.hero-villain-points", { action: "sync", pool: { hero: heroPoints, villain: villainPoints } });

                        ui.heroVillainTracker.render();
                    }
                },
                cancel: {
                    label: "Cancel"
                }
            }
        }).render(true);
    }
}

// **Socket Handling for Syncing**
Hooks.once("socketlib.ready", () => {
    game.socket.on("module.hero-villain-points", (data) => {
        if (data.action === "sync") {
            game.settings.set("hero-villain-points", "pointPool", data.pool);
            ui.heroVillainTracker.render();
        }
    });
});

// **Initialize the Module**
Hooks.on("ready", () => {
    console.log("Hero vs. Villain Points Module Loaded");

    game.settings.register("hero-villain-points", "pointPool", {
        name: "Hero/Villain Points",
        scope: "world",
        config: false,
        type: Object,
        default: { hero: 4, villain: 3 },
        onChange: () => ui.heroVillainTracker.render()
    });

    game.settings.register("hero-villain-points", "position", {
        name: "Tracker Position",
        scope: "client",
        config: false,
        type: Object,
        default: { left: 100, top: 100 }
    });

    if (!ui.heroVillainTracker) {
        ui.heroVillainTracker = new HeroVillainTracker();
    }
    ui.heroVillainTracker.render(true);
});

// **Macro function for Players and GMs**
window.toggleHeroVillainTracker = function () {
    if (!ui.heroVillainTracker) {
        ui.heroVillainTracker = new HeroVillainTracker();
    }

    if (ui.heroVillainTracker.rendered) {
        ui.heroVillainTracker.close();
    } else {
        ui.heroVillainTracker.render(true);
    }
};
