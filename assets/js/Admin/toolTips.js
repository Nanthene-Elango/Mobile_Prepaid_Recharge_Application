import { computePosition } from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@latest/+esm';

// Function to show tooltip on hover
async function showEditTooltip(event) {
    const button = event.currentTarget;  // The hovered edit button
    const planId = button.id.replace("editBtn", "");  // Extract the plan ID
    const tooltip = document.getElementById(`editToolTip${planId}`);

    if (!tooltip) return; // If no tooltip found, exit

    tooltip.classList.remove("d-none"); // Show the tooltip

    // Compute position using Floating UI
    const { x, y } = await computePosition(button, tooltip, {
        placement: 'top',
    });

    // Apply computed position
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Function to hide tooltip when mouse leaves
function hideEditTooltip(event) {
    const button = event.currentTarget;
    const planId = button.id.replace("editBtn", "");
    const tooltip = document.getElementById(`editToolTip${planId}`);

    if (tooltip) {
        tooltip.classList.add("d-none"); // Hide the tooltip
    }
}

// Attach hover events to all edit buttons
document.querySelectorAll("[id^='editBtn']").forEach(button => {
    button.addEventListener("mouseenter", showEditTooltip);
    button.addEventListener("mouseleave", hideEditTooltip);
});


// Function to show tooltip on hover
async function showDeleteTooltip(event) {
    const button = event.currentTarget;  // The hovered edit button
    const planId = button.id.replace("deleteBtn", "");  // Extract the plan ID
    const tooltip = document.getElementById(`deleteToolTip${planId}`);

    if (!tooltip) return; // If no tooltip found, exit

    tooltip.classList.remove("d-none"); // Show the tooltip

    // Compute position using Floating UI
    const { x, y } = await computePosition(button, tooltip, {
        placement: 'top',
    });

    // Apply computed position
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Function to hide tooltip when mouse leaves
function hideDeleteTooltip(event) {
    const button = event.currentTarget;
    const planId = button.id.replace("deleteBtn", "");
    const tooltip = document.getElementById(`deleteToolTip${planId}`);

    if (tooltip) {
        tooltip.classList.add("d-none"); // Hide the tooltip
    }
}

// Attach hover events to all edit buttons
document.querySelectorAll("[id^='deleteBtn']").forEach(button => {
    button.addEventListener("mouseenter", showDeleteTooltip);
    button.addEventListener("mouseleave", hideDeleteTooltip);
});
