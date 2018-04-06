import { Component, ElementRef, EventEmitter, HostListener, Input, Output, OnInit } from '@angular/core';
import visualCMS from 'visual-cms.core';
import * as FlowElement from 'visual-cms.core/classes/core/FlowElement.js';
import * as Text from 'visual-cms.core/classes/core/Text.js';
import * as PhrasingElement from 'visual-cms.core/classes/core/PhrasingElement.js';
import * as Block from 'visual-cms.core/classes/base/Block.js';
import * as ListElement from 'visual-cms.core/classes/base/ListElement.js';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

declare const document;
/** ecvc editor component. */
@Component({
  selector: 'ec-vc-editor,[ec-vc-editor]',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  /** Input json */
  @Input() json;
  /** emits on change */
  @Output() change: EventEmitter<any> = new EventEmitter();
  /** current edited element */
  private element;
  /** current edited branch in class */
  public caret: any;
  private ecvc;
  public content: any;

  private source: any = new Subject();
  /** Observable that is nexted when the content has changed. */
  public change$ = this.source.asObservable();

  private flowElements = [
    {
      tag: 'h1',
      json: {
        type: 'headline',
        settings: {
          level: 1
        }
      }
    },
    {
      tag: 'h2',
      json: {
        type: 'headline',
        settings: {
          level: 2
        }
      }
    },
    {
      tag: 'h3',
      json: {
        type: 'headline',
        settings: {
          level: 3
        }
      }
    },
    {
      tag: 'h4',
      json: {
        type: 'headline',
        settings: {
          level: 4
        }
      }
    },
    {
      tag: 'h5',
      json: {
        type: 'headline',
        settings: {
          level: 5
        }
      }
    },
    {
      tag: 'blockquote',
      json: {
        type: 'quote'
      }
    }]; // 'img','ul','ol','li'
  private phrasingElements = [
    {
      tag: 'a',
      json: { type: 'link' }
    },
    {
      tag: 'code',
      json: { type: 'code' }
    },
    {
      tag: 'em',
      json: { type: 'emphasis' }
    },
    {
      tag: 'strong',
      json: { type: 'strong' }
    },
    {
      tag: 'sub',
      json: { type: 'subscript' }
    },
    {
      tag: 'sup',
      json: { type: 'superscript' }
    }];

  constructor(private el: ElementRef) {
  }

  isFlowActive(el) {
    if (!this.caret || !this.caret.flow || !this.caret.block) {
      return;
    }
    return el.tag === this.caret.block.tagName.toLowerCase();
  }

  isPhrasingActive(el) {
    if (!this.caret || !this.caret.phrasing || !this.caret.cursor) {
      return;
    }
    return el.json.type === this.caret.phrasing.type;
    // return el.tag === this.caret.cursor.tagName.toLowerCase();
  }

  getSelection() {
    const selection = window.getSelection();
    return selection;
  }

  blockEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  }

  @HostListener('click', ['$event'])
  click(e: any) {
    const target = e.target;
    this.editElement(target);
  }

  @HostListener('mousedown', ['$event'])
  mousedown(e: any) {
    if (this.getID(e.target)) {
      this.editElement(e.target);
    }
  }

  @HostListener('focusout', ['$event'])
  focusOut(e: any) {
    // return this.blockEvent(e);
    // this.blur(e.target);
    // this.update();
  }

  @HostListener('paste', ['$event'])
  paste(e: any) {
    // TODO eventually split
    e.preventDefault();
    return false;
  }

  @HostListener('keydown', ['$event'])
  keydown(e: any) {
    if ([9, 13].indexOf(e.keyCode) === -1) {
      return;
    }
    const parent = this.getParent(this.caret.flow);
    const parentNode = this.getElement(parent);
    if (e.keyCode === 13) { // enter //TODO twice enter
      const branch = visualCMS.parse({
        type: this.caret.flow.type,
        settings: this.caret.flow.settings,
        content: '-'
      });
      const index = parent.content.indexOf(this.caret.flow);
      parent.content.splice(index + 1, 0, branch);
      const element = this.createElement(branch);
      if (this.caret.block.nextSibling) {
        parentNode.insertBefore(element, this.caret.block.nextSibling);
      } else {
        parentNode.appendChild(element);
      }
      this.editElement(element);
      this.caretToEnd(element);
      // branch.content = '';
    }
    // if (e.keyCode === 13) { //enter
    //   this.caret.content = this.caret.content + "\n";
    //   current.innerHTML += '<br><br>';
    /*const branch = visualCMS.parse({ type: 'text' });
     branch.content = "\n";
     template.content.push(branch);
     console.log('parent', parent);
     const element = this.createElement(branch);
     console.log('element', element);
     block.appendChild(element);*/
    // document.execCommand('insertHTML', false, '<br><br>');
    // }

    // this.update();
    return this.blockEvent(e);
  }

  @HostListener('keyup', ['$event'])

  keyup(e: any) {
    this.update();
  }

  blur(element = this.element) {
    if (!element) {
      return;
    }
    element.removeAttribute('contenteditable');
    if (this.element === element) {
      delete this.caret;
      delete this.element;
    }
  }

  createElement(instance) {
    const div = document.createElement('div');
    instance.content = instance.content || '';
    div.innerHTML = instance.toStringWithDataID();
    return div.firstChild;
  }

  /*domToHtml(html) {
   const div = document.createElement('div');
   div.innerHTML = html;
   return div.firstChild;
   }*/

  insert(instance, into) {

  }

  getTextNode(el?) {
    el = el || <HTMLElement>document.getSelection().focusNode;
    if (el.nodeType !== 3) {
      return this.getTextNode(el.firstChild);
    }
    return el;
  }

  replaceInstance(instance, replacer, focus?) {
    const position = document.getSelection().focusOffset;
    if (Array.isArray(replacer)) {
      replacer = replacer[0];
    }
    // const replacedNode = this.domToHtml(replacer.toStringWithDataID());
    const replacedNode = this.createElement(replacer);
    if (this.isFlow(instance) && !this.isFlow(replacer)) {
      this.getElement(instance).innerHTML = '';
      this.getElement(instance).appendChild(replacedNode);
      instance.content = replacer;

      focus = focus ? this.getElement(focus) : null;
      this.setCaret(position || 0, this.getTextNode(focus || replacedNode));
      this.editElement(replacedNode);
      return;
    }

    // replace instance in parent
    const parent = this.getParent(instance);
    if (Array.isArray(parent.content)) {
      const index = parent.content.indexOf(instance);
      parent.content.splice(index, 1, replacer);
    } else {
      parent.content = replacer;
    }

    // replace html
    this.getElement(parent).replaceChild(replacedNode, this.getElement(instance));

    focus = focus ? this.getElement(focus) : null;
    this.setCaret(position || 0, this.getTextNode(focus || replacedNode));
    this.editElement(replacedNode);
    return replacedNode;
  }

  setFlowElement(element, e?) {
    this.blockEvent(e);
    if (!this.caret || !this.caret.flow || !this.caret.phrasing) {
      return;
    }
    if (this.isFlowActive(element)) {
      element = {
        tag: 'p',
        json: {
          type: 'paragraph'
        }
      };
    }
    const replacedJSON = Object.assign(element.json, {
      content: this.caret.flow.content,
      id: this.caret.flow.id
    });
    this.replaceInstance(this.caret.flow, visualCMS.parse(replacedJSON), this.caret.phrasing);
    return;
  }

  setPhrasingElement(element, e?) {
    this.blockEvent(e);
    if (!this.caret || !this.caret.flow || !this.caret.phrasing) {
      return;
    }
    if (document.getSelection().toString().length) {
      const node = this.wrap(element);
      this.update();
      return;
    } else {
      // console.log('no selection');
    }
    if (this.isPhrasingActive(element)) {
      this.replaceInstance(this.caret.phrasing, this.caret.phrasing.content);
      return;
    }
    const replacedJSON = Object.assign(element.json, {
      content: this.caret.phrasing.content,
      id: this.caret.phrasing.id
    });
    this.replaceInstance(this.caret.phrasing, visualCMS.parse(replacedJSON));
    // first Child is text node
  }

  focus(element = this.element) {
    if (!element) {
      return;
    }
    element.setAttribute('contenteditable', true);
    element.focus();
    this.element = element;
  }

  getElement(instance?): HTMLElement {
    if (instance) {
      return <HTMLElement>document.querySelector(`[data-ec-id="${instance.id}"]`);
    }
    return <HTMLElement>document.getSelection().anchorNode.parentNode; // TODO
  }

  // walks the dom at the root of instance
  skyWalker(instance, f) {
    const root = this.getElement(instance);
    const treeWalker: any = document.createTreeWalker(root, NodeFilter.SHOW_ALL);
    while (treeWalker.nextNode()) {
      f(treeWalker);
    }
  }

  select() {
    const content = window.getSelection().getRangeAt(0).cloneContents();
    const treeWalker: any = document.createTreeWalker(content, NodeFilter.SHOW_ALL);
    const elements = [];

    while (treeWalker.nextNode()) {
      if (!treeWalker.currentNode.parentElement) {
        const el = <HTMLElement>document.getSelection().anchorNode.parentNode.cloneNode(true);
        el.innerText = treeWalker.currentNode.nodeValue;
        elements.push(el);
      } else if (treeWalker.currentNode.nodeType === 3) {
        console.log(treeWalker.currentNode.parentElement);
        elements.push(treeWalker.currentNode.parentElement);
      } else {
        console.log(treeWalker.currentNode);
        elements.push(treeWalker.currentNode);
      }
    }
    return elements;
  }

  replaceSelection(el) {
    const range = window.getSelection().getRangeAt(0);
    range.deleteContents();
    range.insertNode(el);
  }

  splitAt = index => it => [it.slice(0, index), it.slice(index)];

  getText(instance) {
    if (this.isText(instance)) {
      return instance.content;
    }
    return this.getText(instance.content);
  }

  wrap(phrasing) {
    const content = window.getSelection().getRangeAt(0).cloneContents();
    const treeWalker: any = document.createTreeWalker(content, NodeFilter.SHOW_ALL);
    const elements = [];
    const selection = document.getSelection();
    // const parent = this.getInstance(this.getElement());
    let parent = this.caret.phrasing;
    if (this.isText(parent)) {
      parent = this.getParent(parent);
    }

    while (treeWalker.nextNode()) {
      if (!treeWalker.currentNode.parentElement) {
        console.dir(treeWalker.currentNode);

        const base = selection.baseNode;
        const container = base.parentNode;
        let el = this.getInstance(container);
        if (this.isText(el)) {
          el = this.getInstance(container.parentNode);
        }

        console.dir(base);
        console.dir(container);
        const start = Math.min(selection.anchorOffset, selection.focusOffset);
        // const content = this.getText(this.caret.phrasing);
        const text = this.getText(el);

        const split = this.splitAt(start)(text);
        split[1] = split[1].substr(selection.toString().length);
        const json = Object.assign(phrasing.json, { content: treeWalker.currentNode.nodeValue });
        split.splice(1, 0, json);

        // parent.content = split.filter(e => e);
        el.content = split.filter(e => e);

        this.flushInstance(parent);
        this.selectNode(this.getElement(parent.content[1] || parent.content[0]));
      } else if (treeWalker.currentNode.nodeType === 3) {
        // TODO
        elements.push(treeWalker.currentNode.parentElement);
      } else {
        // TODO
        elements.push(treeWalker.currentNode);
      }
    }
  }

  getCaret() {
    const element = this.getElement(); // element where cursor is at
    const block = this.getBlock(element); // surrounding block
    const flow = this.getInstance(block);
    let phrasing = this.getInstance(element);
    if (this.isFlow(phrasing) || this.isBlock(phrasing)) {
      phrasing = flow.content[0];
    }
    const c = {
      phrasing,
      flow,
      cursor: element, block
    };
    return c;
  }

  getBlock(element) {
    if (!element || !element.parentNode) {
      return;
    }
    const instance = this.getInstance(element);
    if (!instance || !this.isFlow(instance)) {
      return this.getBlock(element.parentNode);
    }
    return element;
  }

  getFlow(element) {
    return this.getInstance(this.getBlock(element));
  }

  isText(instance) {
    return instance instanceof Text;
  }

  isFlow(instance) {
    return instance instanceof (FlowElement || ListElement);
  }

  isBlock(instance) {
    return instance instanceof Block;
  }

  isPhrasing(instance) {
    return instance instanceof PhrasingElement;
  }

  editElement(element, force = true) {
    const instance = this.getInstance(element);
    if (!instance || instance.type === 'block') {
      return;
    }
    element = this.getBlock(element) || element;
    if (element !== this.element || force) {
      this.blur();
      this.focus(element);
    }
    this.update();
  }

  getID(child) {
    return child['getAttribute']('data-ec-id');
  }

  saveSelection() {
    /*var mainDiv = document.getElementById("main");
     var startNode = mainDiv.firstChild.firstChild;
     var endNode = mainDiv.childNodes[2].firstChild;

     var range = document.createRange();
     range.setStart(startNode, 6); // 6 is the offset of "world" within "Hello world"
     range.setEnd(endNode, 7); // 7 is the length of "this is"
     var sel = window.getSelection();
     sel.removeAllRanges();
     sel.addRange(range);*/
  }

  selectNode(node) {
    const selection = document.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  setCaretPosition(node, offset) {
    const selection = document.getSelection();
    const range = document.createRange();
    range.setStart(node, offset);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  flushInstance(instance) {
    const flushed = this.createElement(instance);
    const element = this.getElement(instance);
    element.innerHTML = flushed['innerHTML'];
  }

  areSimilar(a, b) {
    return (a.type === b.type && !a.settings && !b.settings);
  }

  concatInstance(a, b) {
    if (!this.areSimilar(a, b)) {
      return;
    }
    if (this.isText(a)) {
      a.content += b.content;
    } else {
      a.content.concat(b.content);
    }
  }

  setCaret(position, el?) {
    el = el || this.getTextNode(el);
    const selection = document.getSelection();
    const range = document.createRange();
    range.setStart(el, position);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  caretToEnd(el?) {
    el = el || this.caret.phrasing;
    this.setCaret(el.textContent.length, el);
  }

  updateBlock(instance) { // TODO reduce text nodes that are direct siblings to one!!
    const element = this.getElement(instance);
    const children = Array.from(element.childNodes);
    if (!children || !children.length) {
      return;
    }
    // console.log('--------- update block', children);
    if (!Array.isArray(instance.content)) {
      instance.content = [instance.content];
    }
    instance.content = children
      .map((child, index) => {
        if (child.nodeType === 3) {
          const node = visualCMS.parse(child.textContent);
          const el = this.createElement(node);
          // replace html
          child.parentNode.replaceChild(el, child);
          this.caretToEnd(el);
          return node;
        }
        const id = child['getAttribute']('data-ec-id');
        const match = instance.content.find(node => node.id === id);
        if (!match) {
          return;
        }
        return match;
      })
      .filter((child) => child);
    //
    /*.reduce((nodes, child, index) => {
     const latest = nodes.length ? nodes[index - 1] : null;
     if (!latest || !this.concatInstance(latest, child)) {
     nodes.push(child);
     }
     return nodes;
     }, []);*/
    //

    if (instance.content.length !== children.length) {
      console.warn('UFFBASSE');
    }

    instance.content.forEach((child, index) => {
      if (this.isFlow(child)) {
        this.updateBlock(child);
      } else if (this.isText(child) || this.isPhrasing(child)) {
        child.content = children[index]['textContent'];
      }
    });
  }

  update(element = this.element) {
    const nodes = [];
    /*this.skyWalker(this.ecvc, (treeWalker) => {
     if (treeWalker.currentNode.nodeType === 3) {
     const phr = this.getInstance(treeWalker.currentNode.parentNode);
     if (!this.isPhrasing(phr)) {
     console.log('!DETECTED TEXT NODE!!!', treeWalker.currentNode);
     }
     if (treeWalker.currentNode.parentNode) {
     return;
     }
     }
     //finds nodes without id or with duplicate ids and creates text nodes
     const id = this.getID(treeWalker.currentNode);
     const match = nodes.find((node) => node.id === id);
     if (!id || match) {
     const flow = this.getFlow(treeWalker.currentNode);
     if (!Array.isArray(flow.content)) {
     flow.content = [flow.content];
     }
     flow.content.unshift(match ? match.node.textContent : treeWalker.currentNode.textContent);
     this.flushInstance(flow);
     }
     nodes.push({ id: this.getID(treeWalker.currentNode), node: treeWalker.currentNode });
     });*/

    this.caret = this.getCaret();

    if (!element) {
      return;
    }
    const instance = this.getInstance(element);
    if (!instance) {
      return;
    }
    if (!this.isFlow(instance)) {
      instance.content = element.textContent;
    } else {
      this.updateBlock(instance);
    }
    this.source.next(this.ecvc);
  }

  getInstance(element = this.element) {
    const id = element.getAttribute('data-ec-id');
    if (!id) {
      return;
    }
    return this.ecvc.find((o) => o.id === id);
  }

  getParent(instance) {
    if (Array.isArray(this.ecvc) && this.ecvc.indexOf(instance) !== -1) {
      return this.ecvc;
    }
    return this.ecvc.find((node) => {
      if (!Array.isArray(node.content)) {
        return node.content === instance;
      }
      return node.content.indexOf(instance) !== -1;
    })
  }

  getContent(ecvc) {
    if (Array.isArray(ecvc)) {
      return ecvc.reduce((content, node) => content.concat(node.toStringWithDataID()), '');
    }
    return ecvc.toStringWithDataID()
  }

  getJSON(ecvc) {
    if (Array.isArray(ecvc)) {
      return ecvc.map((node) => node.toJSON());
    }
    return ecvc.toJSON()
  }

  render() {
    this.content = this.getContent(this.ecvc);
  }

  ngOnInit() {
    if (!this.json) {
      return;
    }
    if (Array.isArray(this.json)) {
      this.json = {
        type: 'block',
        content: this.json
      }
    }
    this.ecvc = visualCMS.parse(this.json);
    this.content = this.getContent(this.ecvc);
    // console.log(this.getJSON(this.ecvc));
    this.change$.debounceTime(100).subscribe((ecvc) => {
      this.json = this.getJSON(ecvc);
      this.change.next(this);
    });
  }
}
