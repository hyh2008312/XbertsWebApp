import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Blogs, Owner, Achievement, Interact, Vote} from '../blogs';
import { BlogsService } from '../blogs.service';
import { SystemConstant, BlogCover} from '../../config/app.constant';

@Component({
  selector: 'app-blogs-detail',
  templateUrl: './blogs-detail.component.html',
  styleUrls: ['./blogs-detail.component.scss']
})

export class BlogsDetailComponent implements OnInit {

  blogs : Blogs = new Blogs();
  owner : Owner = new Owner();
  achievement : Achievement = new Achievement();
  interact : Interact = new Interact();
  vote: Vote = new Vote();

  userId : string = '';
  scrollUp : boolean = false;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private systemConstant: SystemConstant,
    private blogCover: BlogCover
  ) { }

  ngOnInit():void {

    if(window['WebAppInterface']) {
      window['WebAppInterface'].toCancelProgress();
    }

    if(window['WebAppInterface']) {
      this.userId = window['WebAppInterface'].getUserId();
    }

    let id = this.route.snapshot.params['id'];
    this.blogsService.getBlogsDetail(id).then(blogs => {
      this.blogs = blogs;
      this.owner = blogs.owner;
      this.interact = blogs.interact;
      if(blogs.interact.current_join == null) {
        this.vote = { id: null, vote: null};
      } else {
        this.vote = blogs.interact.current_join;
      }

      let self = this;

      self.blogsService.getAchievement(self.owner.id).then(achievement => {
        self.achievement = achievement;

        return self;
      });
    });

  }

  toProfile(id:number) {
    if(window['WebAppInterface']) {
      window['WebAppInterface'].toProfile(id);
    }
  }

  getPosition(company:string, position:string) {
    if(company && position) {
      return `${position}  @  ${company}`;
    } else if(position && !company) {
      return `${position}`;
    } else if(company && !position) {
      return `${company}`;
    }
  }

  getDetail(details: string) {
    details = details.replace(/(<p><br><\/p>){3,}/ig, "<p><br></p>");
    return details;
  }

  onScrollChange(event:boolean) {
    this.scrollUp = event;
  }

  onFollowerChange(event:boolean) {
    if(event == true) {
      this.achievement.followersAmount++;
    } else {
      this.achievement.followersAmount--;
    }
  }

  getBlogsImage(url:string) {
    if(url == null) {
      return false;
    }
    let use = this.blogCover.use;
    let category = this.blogCover.category;
    let detail = this.blogCover.detail;
    let originUrl = this.blogCover.originUrl;

    let domainFile = url.split(this.systemConstant.baseUrl)[1];
    if(domainFile != null) {
      let file = url.split(originUrl)[1];
      if(file != null) {
        return this.systemConstant.accessUrl + '/public/' + category + '/' + use + '/' + detail + '/' + file;
      } else {
        return this.systemConstant.accessUrl + domainFile;
      }
    } else {
      return url;
    }

  }
}
