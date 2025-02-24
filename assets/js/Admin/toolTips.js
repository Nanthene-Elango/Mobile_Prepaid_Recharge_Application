import { computePosition } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm';

async function showTooltip(event, type) {
    const button = event.currentTarget;
    const planId = button.id.replace(`${type}Btn`, ""); 
    console.log(planId);
    const tooltip = document.getElementById(`${type}ToolTip${planId}`);

    if (!tooltip) return;

    tooltip.classList.remove("d-none"); 
    tooltip.style.position = "absolute"; 
    tooltip.style.zIndex = "1000"; 

    const { x, y } = await computePosition(button, tooltip, {
        placement: 'top',
    });

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip(event, type) {
    const button = event.currentTarget;
    const planId = button.id.replace(`${type}Btn`, "");
    const tooltip = document.getElementById(`${type}ToolTip${planId}`);

    if (tooltip) {
        tooltip.classList.add("d-none");
        tooltip.style.left = ""; 
        tooltip.style.top = "";
    }
}


document.querySelectorAll("[id^='editBtn']").forEach(button => {
    button.addEventListener("mouseenter", (e) => showTooltip(e, "edit"));
    button.addEventListener("mouseleave", (e) => hideTooltip(e, "edit"));
});

document.querySelectorAll("[id^='deleteBtn']").forEach(button => {
    button.addEventListener("mouseenter", (e) => showTooltip(e, "delete"));
    button.addEventListener("mouseleave", (e) => hideTooltip(e, "delete"));
});
