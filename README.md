# 🎭 Hero vs. Villain Points - Foundry VTT Module  
**A Pathfinder 2E module inspired by the Star Wars Destiny Point system**  

---

## 📖 Overview  
This module implements a **Hero vs. Villain Point** system for **Pathfinder 2E** in **Foundry VTT**.  
Instead of using buttons, points are displayed as **7 visual circles** that the **GM can flip** to represent the balance of power.  

### **🔹 Features**  
✅ **Hero Points (⚪) & Villain Points (🔵)** are visually represented as circles.  
✅ **GM-Only Control**: Players **cannot** change points; only the GM can modify them.  
✅ **Real-Time Sync**: Updates for all players instantly.  
✅ **Persistent State**: Points are saved between sessions.  
✅ **GM Configuration Menu**: Allows manual adjustment of Hero/Villain points.  

---

## 🎮 How It Works  
1️⃣ **The GM clicks on a circle** to flip between Hero (⚪) and Villain (🔵).  
2️⃣ **Players can see the changes but cannot interact** with the circles.  
3️⃣ **The GM can open the configuration menu** to manually adjust the point distribution.  

---

## ⚙️ Installation  
1️⃣ **Download & Install:**  
   - Download the latest release or clone this repository.  
   - Place the module folder inside your Foundry VTT **`modules`** directory.  
   - Activate the module in **Foundry VTT → Game Settings → Manage Modules**.  

2️⃣ **Enable in Your Game:**  
   - **System:** Pathfinder 2E  
   - **Activate Module:** `Hero vs. Villain Points`  
   - Use the macro to **open the tracker**:  
     ```javascript
     toggleHeroVillainTracker();
     ```

---

## 🛠 Usage  
- **Flipping a Point:** The **GM clicks on a circle** to switch between Hero/Villain.  
- **Configuring Points:** The GM clicks **"Configure"** to set a custom balance.  
- **Tracker Visibility:** Use the provided macro or enable it in the UI.  

---

## 🛠 Future Enhancements  
🔄 **Custom Colors/Themes**: Allow customization of the circle colors.  
🎭 **Optional Player Control**: Add an option to let players flip points.  
📝 **GM Log**: Track who spent a point.  

---

## 💡 Credits  
**Author:** [Your Name]  
**Foundry VTT System:** **Pathfinder 2E**  

---

## 📜 License  
This module is released under the **MIT License**.  

---

## 🚀 Feedback & Contributions  
Enjoy using **Hero vs. Villain Points**?  
Leave feedback, report issues, or contribute to future updates! 🎉  
