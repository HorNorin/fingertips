import {Config} from '../services';
import {Component, View} from 'angular2/core';
import {OnInit, AfterViewInit, OnDestroy} from 'angular2/core';

declare var hljs: any;
declare var $: any;
enum Direction { FORWORD, BACKWORD }

@Component({
  selector: 'skill'
})
@View({
  template: require('../../views/template/skill.html'),
  styles: [require('../../styles/directives/skill.css')]
})
export class SkillDirective implements OnInit, OnDestroy, AfterViewInit {
  code: string;

  private _skills: any;
  private _current: any;
  private _interval: any;

  ngOnInit() {
    this.code = `
class Post << ActiveRecord::Base
  # @return [Post]
  def index
    @posts = Post.all
    render json: @posts
  end
end
    `;

    this._skills = $('.skill-widget-item');
    this._skills.filter(':gt(0)').hide();
    this._current = this._skills.first();
    this._interval = setInterval(this._slide.bind(this), Config.skill.fadeInterval);
  }

  ngAfterViewInit() {
    $('pre code').each((i, block) => {
      hljs.configure({ tabReplace: '  ' });
      hljs.highlightBlock(block);
    });
  }

  ngOnDestroy() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  slideToPrev($event) {
    $event.preventDefault();

    if (this._interval) {
      clearInterval(this._interval);
    }

    this._slide(Direction.BACKWORD);
    this._interval = setInterval(this._slide.bind(this), Config.skill.fadeInterval);
  }

  slideToNext($event) {
    $event.preventDefault();

    if (this._interval) {
      clearInterval(this._interval);
    }

    this._slide(Direction.FORWORD);
    this._interval = setInterval(this._slide.bind(this), Config.skill.fadeInterval);
  }

  private _slide(direction: Direction = Direction.FORWORD) {
    var nextSlide: any;

    if (direction === Direction.FORWORD) {
      if (this._current.next().length > 0) {
        nextSlide = this._current.next();
      } else {
        nextSlide = this._skills.first();
      }
    } else {
      if (this._current.prev().length > 0) {
        nextSlide = this._current.prev();
      } else {
        nextSlide = this._skills.last();
      }
    }

    this._current.fadeOut(Config.skill.fadeDuration, () => {
      nextSlide.fadeIn(Config.skill.fadeDuration);
      this._current = nextSlide;
    });
  }
}
