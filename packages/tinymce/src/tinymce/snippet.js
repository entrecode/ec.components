// image upload

uploadScope = scope.$new(true);
upload = $compile(window.$el[0])(uploadScope);

uploadScope.text = editor.selection.getContent({ 'format': 'text' });
uploadScope.responsive = true;

if (edit === true) {
  uploadScope.responsive = element.classList.contains('responsive');
  uploadScope.alt = element.getAttribute('alt');
  uploadScope.src = element.getAttribute('data-asset-id');
}

uploadScope.$watch('src', function () {
  if (uploadScope.src) {
    this.sdk.api.asset(uploadScope.src)
    .then(function (asset) {
      uploadScope.asset = asset;
      uploadScope.alt = uploadScope.alt && uploadScope.alt.length ? uploadScope.alt : asset.value.title;
      uploadScope.text = uploadScope.text.length ? uploadScope.text : asset.value.title;
      uploadScope.$digest();
    });
  } else {
    delete uploadScope.asset;
  }
});

onsubmit: function () {
  let url;
  if (uploadScope.asset.value.type === 'image') {
    url = uploadScope.asset.getImageUrl(640);
    if (edit === true) {
      element.setAttribute('alt', uploadScope.alt);
      element.setAttribute('title', uploadScope.alt);
      element.setAttribute('src', url);
      element.setAttribute('data-asset-id', uploadScope.src);
      if (uploadScope.responsive) {
        element.classList.add('responsive');
      } else {
        element.classList.remove('responsive');
      }
    } else {
      editor.insertContent('<img src="' + url + '" alt="' + uploadScope.alt +
        '" title="' + uploadScope.alt + '"' + (uploadScope.responsive ?
          ' class="responsive" ' : ' ') + 'data-asset-id="' + uploadScope.src + '">');
    }
  }
  if (uploadScope.asset.value.type === 'document') {
    url = uploadScope.asset.getFileUrl();
    editor.insertContent('<a href="' + url + '" data-asset-id="' + uploadScope.src + '">' + uploadScope.text + '</a>');
  }
  upload.remove();
  uploadScope.$destroy();
}

// internal link

this.editor.addButton('internal', {
  icon: 'anchor',
  onclick: function (edit, element) {

    pageLoader.then(function () {
      w = editor.windowManager.open({
        title: 'Internen Link einfügen',
        body: [
          {
            name: 'page',
            type: 'listbox',
            label: 'Seite',
            values: scope.allPages.map(function (page) {
              return {
                text: page.value._entryTitle,
                value: page.value._id + '#' + page.value._entryTitle
              }
            })
          },
          {
            name: 'text',
            type: 'textbox',
            size: 40,
            label: 'Text to display'
          },
          {
            name: 'title',
            type: 'textbox',
            size: 40,
            label: 'Title'
          },
          {
            name: 'class',
            type: 'listbox',
            label: 'Class',
            values: mceSettings.link_class_list.map(function (option) {
              return {
                text: option.title,
                value: option.value
              }
            })
          }
        ],
        onsubmit: function (form) {
          const page = form.data.page.split('#');
          editor.insertContent('<a href="t5-cms://' + page[0] + '"' + (form.data.class ? ' class="' + form.data.class + '"' : '') + (form.data.title ? ' title="' + form.data.title + '"' : '' ) + '>'
            + (form.data.text && form.data.text.length ? form.data.text : page[1]) + '</a>');
        }
      })
    });
  }
});
