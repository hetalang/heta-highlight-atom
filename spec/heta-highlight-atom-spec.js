'use babel';

import HetaHighlightAtom from '../lib/heta-highlight-atom';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('HetaHighlightAtom', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('heta-highlight-atom');
  });

  describe('when the heta-highlight-atom:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.heta-highlight-atom')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'heta-highlight-atom:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.heta-highlight-atom')).toExist();

        let HetaHighlightAtomElement = workspaceElement.querySelector('.heta-highlight-atom');
        expect(HetaHighlightAtomElement).toExist();

        let HetaHighlightAtomPanel = atom.workspace.panelForItem(HetaHighlightAtomElement);
        expect(HetaHighlightAtomPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'heta-highlight-atom:toggle');
        expect(HetaHighlightAtomPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.heta-highlight-atom')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'heta-highlight-atom:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let HetaHighlightAtomElement = workspaceElement.querySelector('.heta-highlight-atom');
        expect(HetaHighlightAtomElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'heta-highlight-atom:toggle');
        expect(HetaHighlightAtomElement).not.toBeVisible();
      });
    });
  });
});
