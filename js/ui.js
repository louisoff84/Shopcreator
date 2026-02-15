console.log("Louis Editing UI Loaded");
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { console.log("Navigation..."); });
});
