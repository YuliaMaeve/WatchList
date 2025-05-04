let currentSection = ""; // Tracks the current section being modified
let currentAction = ""; // Tracks whether adding, editing, or removing
let editingItem = null; // Tracks the item being edited

// Open the modal for adding, editing, or removing items
function openAddModal(section) {
    currentSection = section;
    currentAction = "add";
    document.getElementById("modal-title").textContent = "Add Media";
    document.getElementById("item-select").style.display = "none"; // Hide dropdown
    document.getElementById("item-name").style.display = "block"; // Ensure name input is visible
    document.getElementById("item-name").value = ""; // Reset the name input
    document.getElementById("item-link").value = ""; // Reset the link input
    document.getElementById("item-link").style.display = section === "youtube" ? "block" : "none";  // Show link input only for YouTube
    document.getElementById("modal").style.display = "flex";
}

function openEditModal(section) {
    const list = document.getElementById(`${section}-list`);
    if (list.children.length === 0) {
        alert("No items to edit are available.");
        return; // Prevent the modal from opening
    }
    currentSection = section;
    currentAction = "edit";
    populateDropdown(section); // Populate the dropdown with items
    document.getElementById("modal-title").textContent = "Edit Media";
    document.getElementById("item-select").style.display = "block"; // Show dropdown
    document.getElementById("item-name").value = "";  // Reset the name input
    document.getElementById("item-link").value = ""; // Reset the link input
    document.getElementById("item-link").style.display = section === "youtube" ? "block" : "none";  // Show link input only for YouTube
    document.getElementById("modal").style.display = "flex";
}

function openRemoveModal(section) {
    const list = document.getElementById(`${section}-list`);
    if (list.children.length === 0) {
        alert("No items to remove are available.");
        return; // Prevent the modal from opening
    }
    currentSection = section;
    currentAction = "remove";
    populateDropdown(section); // Populate the dropdown with items
    document.getElementById("modal-title").textContent = "Remove Media";
    document.getElementById("item-select").style.display = "block"; // Show dropdown
    document.getElementById("item-name").style.display = "none"; // Hide name input
    document.getElementById("item-link").style.display = "none"; // Hide link input
    document.getElementById("modal").style.display = "flex";
}

// Populate the dropdown with items from the selected section
function populateDropdown(section) {
    const list = document.getElementById(`${section}-list`);
    const dropdown = document.getElementById("item-select");
    dropdown.innerHTML = ""; // Clear existing options

    Array.from(list.children).forEach((item) => {
        const option = document.createElement("option");
        if (section === "youtube") {
            option.value = item.querySelector("a").textContent;
            option.textContent = item.querySelector("a").textContent;
        } else {
            option.value = item.textContent;
            option.textContent = item.textContent;
        }
        dropdown.appendChild(option);
    });
}

// Close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    editingItem = null;
}

// Save the item (add, edit, or remove)
function saveItem() {
    const name = document.getElementById("item-name").value.trim(); 
    const link = document.getElementById("item-link").value.trim();
    const dropdown = document.getElementById("item-select");  
    const selectedItem = dropdown.value;

    const list = document.getElementById(`${currentSection}-list`); 

    if (currentAction === "add") {
        if (!name) {
            alert("Name is required.");
            return;
        }
        const listItem = document.createElement("li");
        if (currentSection === "youtube") {
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.textContent = name;
            anchor.target = "_blank";
            listItem.appendChild(anchor);
        } else {
            listItem.textContent = name;
        }
        list.appendChild(listItem);
    } else if (currentAction === "edit") {
        const items = Array.from(list.children);
        const item = items.find((li) =>
            currentSection === "youtube"
                ? li.querySelector("a").textContent === selectedItem
                : li.textContent === selectedItem
        );
        if (item) {
            if (currentSection === "youtube") {
                const anchor = item.querySelector("a");
                anchor.href = link;
                anchor.textContent = name || selectedItem;
            } else {
                item.textContent = name || selectedItem;
            }
        }
    } else if (currentAction === "remove") {
        const items = Array.from(list.children);
        const item = items.find((li) =>
            currentSection === "youtube"
                ? li.querySelector("a").textContent === selectedItem
                : li.textContent === selectedItem
        );
        if (item) {
            list.removeChild(item);
        }
    }
    closeModal();
}