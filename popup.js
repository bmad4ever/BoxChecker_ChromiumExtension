document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {
            code: `(${guessCheckboxName.toString()})();`
        }, (results) => {
            const dropdown = document.getElementById('checkboxDropdown');
            const checkboxNames = results[0];
            checkboxNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                option.textContent = name;
                dropdown.appendChild(option);
            });
        });
    });
});

document.getElementById('checkButton').addEventListener('click', () => {
    const checkboxName = document.getElementById('checkboxDropdown').value;
    if (checkboxName) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `(${checkOrUncheckCheckboxes.toString()})('check', '${checkboxName}');`
            });
        });
    } else {
        alert("Please select a checkbox name.");
    }
});

document.getElementById('uncheckButton').addEventListener('click', () => {
    const checkboxName = document.getElementById('checkboxDropdown').value;
    if (checkboxName) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.executeScript(tabs[0].id, {
                code: `(${checkOrUncheckCheckboxes.toString()})('uncheck', '${checkboxName}');`
            });
        });
    } else {
        alert("Please select a checkbox name.");
    }
});

function guessCheckboxName() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const nameCounts = {};

    checkboxes.forEach(checkbox => {
        const name = checkbox.name;
        if (name) {
            nameCounts[name] = (nameCounts[name] || 0) + 1;
        }
    });

    const sortedNames = Object.keys(nameCounts).sort((a, b) => nameCounts[b] - nameCounts[a]);
    return sortedNames;
}

function checkOrUncheckCheckboxes(action, checkboxName) {
    if (!checkboxName) {
        alert("Checkbox name is required.");
        return;
    }

    const checkboxes = document.getElementsByName(checkboxName);
    checkboxes.forEach(checkbox => {
        if (checkbox.type === "checkbox") {
            const shouldCheck = (action === 'check' && !checkbox.checked);
            const shouldUncheck = (action === 'uncheck' && checkbox.checked);

            if (shouldCheck || shouldUncheck) {
                // scroll the checkbox into view
                checkbox.scrollIntoView();

                // get the position of the checkbox
                const rect = checkbox.getBoundingClientRect();
                const x = rect.left + (rect.width / 2);
                const y = rect.top + (rect.height / 2);

                // simulate a mouse click
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y
                });

                checkbox.dispatchEvent(clickEvent);
            }
        }
    });
}
