
document.getElementById('saveTabs').addEventListener('click', function() {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const tabsToSave = tabs.map(tab => ({
        title: tab.title,
        url: tab.url
      }));
  
      chrome.storage.local.set({savedTabs: tabsToSave}, function() {
        console.log('Tabs saved!');
        displayTabs(tabsToSave);
      });
    });
  });
  
  document.getElementById('clearTabs').addEventListener('click', function() {
    chrome.storage.local.remove('savedTabs', function() {
      console.log('Tabs cleared!');
      displayTabs([]); // تفريغ العرض من التبويبات المحفوظة
    });
  });
  
  function displayTabs(tabs) {
    const tabsList = document.getElementById('tabsList');
    tabsList.innerHTML = '';
  
    tabs.forEach(tab => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = tab.url;
      a.textContent = tab.title || tab.url;
      a.target = '_blank';
      li.appendChild(a);
      tabsList.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get('savedTabs', function(result) {
      if(result.savedTabs) {
        displayTabs(result.savedTabs);
      }
    });
  });
  
  