export function showSpinner() {
    const spinnerDiv = document.getElementById("spinner-div");
    spinnerDiv.classList.remove("hidden");
}

export function hideSpinner() {
    const spinnerDiv = document.getElementById("spinner-div");
    spinnerDiv.classList.add("hidden");
}