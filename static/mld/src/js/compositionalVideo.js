/* 
origin: https://github.com/dreamfusion3d/dreamfusion3d.github.io/blob/main/assets/js/scripts.js
*/

(function () {
  // Format video selector for compositional prompts.
  let captions = [
    'A person walks forwards ',
    'A person walks forwards carefully',
    'A person walks forwards briskly',
    'A person walks forwards slowly',
    'A person walks forwards confidently',
    'A person walks to the left ',
    'A person walks to the left carefully',
    'A person walks to the left briskly',
    'A person walks to the left slowly',
    'A person walks to the left confidently',
    'A person walks to the right ',
    'A person walks to the right carefully',
    'A person walks to the right briskly',
    'A person walks to the right slowly',
    'A person walks to the right confidently',
    'A person walks in a circle ',
    'A person walks in a circle carefully',
    'A person walks in a circle briskly',
    'A person walks in a circle slowly',
    'A person walks in a circle confidently',
    'A person jumps forwards ',
    'A person jumps forwards carefully',
    'A person jumps forwards briskly',
    'A person jumps forwards slowly',
    'A person jumps forwards confidently',
    'A person start crawling forwards ',
    'A person start crawling forwards carefully',
    'A person start crawling forwards briskly',
    'A person start crawling forwards slowly',
    'A person start crawling forwards confidently',
    'A person looks forwards ',
    'A person looks forwards carefully',
    'A person looks forwards briskly',
    'A person looks forwards slowly',
    'A person looks forwards confidently',
  ];

  let imagen_pieces = [
    [
      'A person walks forwards',
      'A person walks to the left',
      'A person walks to the right',
      'A person walks in a circle',
      'A person jumps forwards',
      'A person start crawling forwards',
      'A person looks forwards',
    ],
    ['', 'carefully', 'briskly', 'slowly', 'confidently'],
  ];

  const updateCompositionVideo = () => {
    let phrase = '';
    for (let depth = 1; depth <= imagen_pieces.length; depth++) {
      let tagContainer = document.getElementById(
        'compositional_tags_depth_' + depth
      );
      let selected = tagContainer.querySelectorAll('.selected');

      // Make sure at most one item is selected at this level.
      if (selected.length > 1) {
        // Too many tags selected at this level. Shouldn't have happened, but unselect them.
        selected.slice(1, selected.length).forEach((chunk) => {
          chunk.classList = '';
        });
      }

      // Make sure at least one item is selected at this level.
      if (selected.length == 0) {
        tagContainer.querySelector('span').classList = 'selected';
        updateCompositionVideo();
        return;
      }

      let segment = selected[0].getAttribute('data-segment');
      phrase = phrase + segment;
    }

    if (captions.includes(phrase)) {
      let compositionalVideo = document.getElementById('compositionalVideo');
      let container = compositionalVideo.parentNode;
      let videoName = phrase.replaceAll(' ', '_') + '.mp4';
      let sourceURL = 'public/combine/' + videoName;
      let sourceimgURL = sourceURL.replaceAll('.mp4', '.png');
      console.log('phrase found: ', phrase, sourceURL);

      let oldSourceEl = document.getElementById('compositionalVideoSrc');
      let oldVideoEl = document.getElementById('compositionalVideo');
      oldSourceEl.src = sourceURL;

      container.style = 'opacity: 0.0001;';
      setTimeout(() => {
        oldVideoEl.poster = sourceimgURL;
        container.style = 'opacity: 1;';
        compositionalVideo.load();
      }, 750);

      let captionEl = document.getElementById('compositionalCaption');
      if (captionEl) captionEl.innerHTML = phrase;
    } else {
      console.log('phrase NOT found: ' + phrase);
    }
  };

  const deselect = (element) => {
    element.classList = ('' + element.classList).replace('selected', ' '); // not clean, what about spaces?
  };

  const tagClicked = (event) => {
    event.target.parentNode.querySelectorAll('.selected').forEach(deselect);
    event.target.classList = 'selected';
    updateCompositionVideo();
  };

  let phraseContainer = document.querySelector('.compositional .text');
  imagen_pieces.forEach((phrases, depth) => {
    depth = depth + 1;
    let tagContainer = document.createElement('P');
    tagContainer.classList = 'selectable left';
    tagContainer.id = 'compositional_tags_depth_' + depth;

    phrases.forEach((segment, i) => {
      if (depth > 1) {
        segment = ' ' + segment;
      }

      let tag = document.createElement('SPAN');
      let text = segment.trim();
      if (!text) text = '[...]';

      tag.appendChild(document.createTextNode(text));
      tag.setAttribute('data-segment', segment);
      tag.onclick = tagClicked;
      if (i == 0) tag.classList = 'selected';

      tagContainer.appendChild(tag);
    });

    phraseContainer.appendChild(tagContainer);
  });
})();
