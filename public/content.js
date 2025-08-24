document.addEventListener("mouseup", (event) => {
  const selection = window.getSelection().toString().trim();
  if (!selection) return;

  const popup = document.createElement("div");
  popup.innerText = "💾 Save Highlight?";
  popup.style.position = "absolute";
  popup.style.background = "black";
  popup.style.padding = "5px 8px";
  popup.style.borderRadius = "6px";
  popup.style.color="white";
  popup.style.top = `${event.pageY + 5}px`;
  popup.style.left = `${event.pageX + 5}px`;
  popup.style.cursor = "pointer";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  popup.onclick = async () => {
    const highlight = {
      id: Date.now(),
      text: selection,
      page: window.location.href,
    };

    chrome.storage.local.get(["highlights"], (result) => {
      const highlights = result.highlights || [];
      highlights.push(highlight);
      chrome.storage.local.set({ highlights });
    });

    popup.remove();
    alert("✅ Highlight saved!");
  };
});
