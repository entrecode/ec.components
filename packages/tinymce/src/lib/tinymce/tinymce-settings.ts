/** Default settings for tinymce editor. */
export const editorSettings = {
  theme: 'modern',
  menubar: false,
  branding: false,
  resize: true,
  skin: false,
  plugins: [
    'paste template autoresize fullscreen code link table visualblocks autolink lists contextmenu textcolor colorpicker',
  ],
  autoresize_min_height: 300,
  autoresize_max_height: 800,
  content_css: ['https://icons.entrecode.de/ec-icons-3.0.0.min.css'],
  paste_as_text: true,
  table_toolbar: false,
  table_default_attributes: {
    class: 'table-grid',
  },
  table_class_list: [{ title: 'grid', value: 'table-grid' }],
  // templates: [],
  textcolor_map: [
    '37474F',
    'Text',
    '879195',
    'Text Light',
    '00B0FF',
    'Link',
    'FF5353',
    'Super',
    'FFFF8D',
    'Highlight',
    'FFFFFF',
    'Weiß',
  ],
  link_class_list: [
    { title: 'einfacher link', value: '' },
    { title: 'Normaler Button', value: 'btn' },
    { title: 'Super Button', value: 'btn super' },
    { title: 'Sekundärer Button', value: 'btn minor' },
  ],
  style_formats: [
    { title: 'H2 - Titel', block: 'h2' },
    { title: 'H3 - Untertitel', block: 'h3' },
    { title: 'H4 - Überschrift 1', block: 'h4' },
    { title: 'H5 - Überschrift 2', block: 'h5' },
    { title: 'Einfacher Absatz', block: 'p' },
    { title: 'Einleitung', block: 'p', classes: 'lead' },
    { title: 'Quellenangabe', inline: 'small' },
    { title: 'Checkliste', selector: 'ul', classes: 'v-checklist' },
    { title: 'Frage', selector: 'p', classes: 'v-question' },
    { title: 'Antwort', selector: 'p', classes: 'v-reply' },
  ],
  formats: {
    alignleft: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'v-left',
    },
    aligncenter: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'v-center',
    },
    alignright: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'v-right',
    },
    alignjustify: {
      selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img',
      classes: 'v-full',
    },
  },
  // tslint:disable-next-line:max-line-length
  toolbar: `undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | forecolor | table | template | bullist numlist | link internal image youtube | removeformat | code | fullscreen`,
  setup: (editor) => {
    editor.addButton('youtube', {
      icon: 'media',
      onclick: function(edit, element) {
        const window = editor.windowManager.open({
          title: 'Youtube einfügen',
          body: [
            {
              type: 'textbox',
              name: 'yt',
              label: 'Youtube-Url/ID',
            },
          ],
          onsubmit: function(e) {
            const yt = e.data.yt;

            if (yt) {
              // tslint:disable-next-line:max-line-length
              const ytUrl = /(?:https?:\/\/(?:[a-z]+.)?)(?:youtu\.?be(?:\.com)?\/)(?:embed\/)?(?:(?:(?:(?:watch\?)?(?:time_continue=(?:[0-9]+))?.+v=)?([a-zA-Z0-9_-]+))(?:\?t\=(?:[0-9a-zA-Z]+))?)/g.exec(
                yt,
              );
              const url = 'https://www.youtube.com/embed/' + (ytUrl ? ytUrl[1] : yt) + '?feature=oembed&rel=0';
              editor.insertContent(`<div class="video-wrapper" style="padding-bottom: 56%;">
              <iframe src="' + url + '" type=" text/html" frameborder="0"></div>`);
            }
          },
        });
      },
    });

    // TODO
    /* editor.addButton('image', {
      icon: 'image',
      onclick: function (edit, element) {
        const id = Date.now();
        console.log('image button clicked', edit, element);
        const window = editor.windowManager.open({
          title: 'Bild einfügen',
          body: [{
            type: 'container',
            html: `<ec-asset-select [solo]="true" [(ngModel)]="src"></ec-file-picker>
            src: {{src}}
            <label ng-show="asset.value.type === \'image\'">Alt-Text
            <input ng-model="alt" type="text"></label>
            <label ng-show="asset.value.type === \'document\'">Text
            <input ng-model="text" type="text"></label>
            <label ng-show="asset.value.type === \'image\'">
            <input ng-model="responsive" type="checkbox"> automatische Breite</label>`
          }],
        });
      }
    }); */
  },
  /* file_browser_callback: (field_name, url, type, win) => {
    console.log('file browser', field_name, url, type, win);
  } */
};
