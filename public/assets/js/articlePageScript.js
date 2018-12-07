import $ from 'jquery';

const articlePageScript = () => {
  const $button = $('.comment-options-btn');
  $button.on('click', (e) => {
    e.stopPropagation();
    $(e.target).next().toggle();
  });

  const menu = $('.options-menu');
  $('body').click(() => menu.hide());

  const reportModal = $('.report-modal');
  $('.report-article-btn').click(() => reportModal.width('100%'));

  $('.btn-cancel-report').click(() => reportModal.width('0%'));

  $('.modal-close-btn').click(() => reportModal.width('0%'));
};

export default articlePageScript;
