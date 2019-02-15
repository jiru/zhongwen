/*
        Zhongwen - A Chinese-English Popup Dictionary
        Original Work Copyright (C) 2012 Christian Schiller
        https://chrome.google.com/extensions/detail/kkmlkkjojmombglmlpbpapmhcaljjkde
        Modified work Copyright (C) 2017 Leonard Lausen
        https://github.com/leezu/zhongwen
*/

function restoreOptions() {
  var optionsPromise = browser.storage.sync.get({
    options: {
      'popupcolor': "yellow",
      'tonecolors': "yes",
      'fontSize': "small",
      'skritterTLD': "com",
      'translit': "pinyin",
      'grammar': 'yes',
      'simpTrad': 'classic',
    }
  });
  optionsPromise.then((storage) => {
    let options = storage.options;
    for (var i = 0; i < document.optform.popupcolor.length; i++) {
      if (document.optform.popupcolor[i].value ==
        options.popupcolor) {
        document.optform.popupcolor[i].selected = true;
        break;
      }
    }

    if (options.tonecolors == 'no') {
      document.optform.tonecolors[1].selected = true;
    } else {
      document.optform.tonecolors[0].selected = true;
    }

    if (options.fontSize == 'small') {
      document.optform.fontSize[1].selected = true;
    } else {
      document.optform.fontSize[0].selected = true;
    }

    if (options.skritterTLD == 'cn') {
      document.optform.skritterTLD[1].selected = true;
    } else {
      document.optform.skritterTLD[0].selected = true;
    }

    if (options.translit == 'zhuyin') {
      document.optform.translit[1].selected = true;
    } else if (options.translit == 'pinyin') {
      document.optform.translit[2].selected = true;
    } else if (options.translit == 'zhuyin_pinyin') {
      document.optform.translit[3].selected = true;
    } else {
      document.optform.translit[0].selected = true;
    }

    if (options.grammar == 'no') {
      document.optform.grammar[1].selected = true;
    } else {
      document.optform.grammar[0].selected = true;
    }
    if (options.simpTrad == 'auto') {
      document.optform.simpTrad[1].selected = true;
    } else {
      document.optform.simpTrad[0].selected = true;
    }
  });
}

function saveOptions() {
  let options = {
    'popupcolor': document.optform.popupcolor.value,
    'tonecolors': document.optform.tonecolors.value,
    'fontSize': document.optform.fontSize.value,
    'skritterTLD': document.optform.skritterTLD.value,
    'translit': document.optform.translit.value,
    'grammar': document.optform.grammar.value,
    'simpTrad': document.optform.simpTrad.value
  };
  let setting = browser.storage.sync.set({
    options
  });
}

document.addEventListener('DOMContentLoaded',
  restoreOptions);
document.querySelector("form").addEventListener("submit",
  saveOptions);
