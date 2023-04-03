const deleteFile = document.getElementById("deleteFile");
const unconfirm = document.getElementById("unconfirm");

deleteFile.addEventListener('click', showConfirmBox);
unconfirm.addEventListener('click', closeConfirmBox);

function showConfirmBox() {
    document.getElementById("overlay").hidden = false;
}
function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
}

