// Get references to DOM elements
var siteInput = document.getElementById("siteName");
var websiteInput = document.getElementById("websiteUrl");
var rowBody = document.getElementById("rowBody");
var overlay = document.getElementById("overlay");
var warning = document.getElementById("warning");
var containerList;

// Initialize containerList from localStorage or set it to an empty array
if (localStorage.getItem("websites") === null) {
    containerList = [];
} else {
    containerList = JSON.parse(localStorage.getItem("websites"));
    displayWebsites(containerList);
}

// Function to add a new website
function addWebsites() {
    if (validateAllInputs()) {
        var website = {
            name: siteInput.value,
            url: websiteInput.value
        };
        containerList.push(website);
        localStorage.setItem("websites", JSON.stringify(containerList));
        displayWebsites(containerList);
        clearWbsites();
        removeIsValidClass();  
    } else {
        openModal();
    }
}

// Function to display websites in the DOM
// displaywbsites
function displayWebsites(arr){
    var cartoona=''
    for(var i=1;i<arr.length;i++){
        cartoona+=` <div class="col-md-12 content-row ">
                    <div class="inner-content d-flex justify-content-around p-2 align-items-center bg-light">
                    <span>${i}</span>
                    <span>${arr[i].name}</span>
                    <a class="btn btn-visit text-white  d-flex align-items-center text-center d-inline-block " href="${arr[i].url}" target="_blank"><i class="fa-solid fa-eye pe-1"></i> View</a>
                    <button class="btn btn-del text-white  d-flex align-items-center text-center" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button>
                    </div>
                </div>`
    }
    rowBody.innerHTML=cartoona
}

// Function to clear input fields
function clearWbsites() {
    siteInput.value = null;
    websiteInput.value = null;
}

// Function to delete a website by index
function deleteWebsite(index) {
    containerList.splice(index, 1);
    localStorage.setItem("websites", JSON.stringify(containerList));
    displayWebsites(containerList);
}

// Function to validate individual input fields
function validation(element) {
    var regex = {
        // Regex pattern to validate site names
        siteName: /^[A-Z]?[a-zA-Z]{2,18}( [A-Z]?[a-zA-Z]{2,18})?$/,
        // Regex pattern to validate website URLs
        websiteUrl: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/
    };

    if (regex[element.id].test(element.value.trim())) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    } else {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false;
    }
}

// Function to validate all input fields
function validateAllInputs() {
    return validation(siteInput) && validation(websiteInput);
}

// Function to remove "is-valid" class from input fields
function removeIsValidClass() {
    siteInput.classList.remove("is-valid");
    websiteInput.classList.remove("is-valid");
}

// Function to open the modal for warnings
function openModal() {
    warning.classList.remove("d-none");
    overlay.classList.remove("d-none");
}

// Function to close the modal
function closeModal() {
    warning.classList.add("d-none");
    overlay.classList.add("d-none");
}

// Event listener to close the modal when the "Escape" key is pressed
document.addEventListener("keydown", function(e) {
    if (e.key === 'Escape') {
        if (!warning.classList.contains("d-none")) {
            closeModal();
        }
    }
});
