import { computePosition } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm';

// Generic function to show tooltip
async function showTooltip(event, type) {
    const button = event.currentTarget;
    const planId = button.id.replace(`${type}Btn`, ""); 
    console.log(planId);
    const tooltip = document.getElementById(`${type}ToolTip${planId}`);

    if (!tooltip) return;

    tooltip.classList.remove("d-none"); // Show tooltip
    tooltip.style.position = "absolute"; // Ensure positioning
    tooltip.style.zIndex = "1000"; // Bring tooltip to front

    // Compute position using Floating UI
    const { x, y } = await computePosition(button, tooltip, {
        placement: 'top',
    });

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Generic function to hide tooltip
function hideTooltip(event, type) {
    const button = event.currentTarget;
    const planId = button.id.replace(`${type}Btn`, "");
    const tooltip = document.getElementById(`${type}ToolTip${planId}`);

    if (tooltip) {
        tooltip.classList.add("d-none"); // Hide tooltip
        tooltip.style.left = ""; // Reset position
        tooltip.style.top = "";
    }
}

// Attach hover events to all edit buttons
document.querySelectorAll("[id^='editBtn']").forEach(button => {
    button.addEventListener("mouseenter", (e) => showTooltip(e, "edit"));
    button.addEventListener("mouseleave", (e) => hideTooltip(e, "edit"));
});

// Attach hover events to all delete buttons
document.querySelectorAll("[id^='deleteBtn']").forEach(button => {
    button.addEventListener("mouseenter", (e) => showTooltip(e, "delete"));
    button.addEventListener("mouseleave", (e) => hideTooltip(e, "delete"));
});
