'use babel';

import HetaHighlightAtomView from './heta-highlight-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  HetaHighlightAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.HetaHighlightAtomView = new HetaHighlightAtomView(state.HetaHighlightAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.HetaHighlightAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'heta-highlight-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.HetaHighlightAtomView.destroy();
  },

  serialize() {
    return {
      HetaHighlightAtomViewState: this.HetaHighlightAtomView.serialize()
    };
  },

  toggle() {
    console.log('HetaHighlightAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
