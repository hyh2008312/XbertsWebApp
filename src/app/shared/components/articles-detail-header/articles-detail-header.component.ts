import { Input, Component, OnInit, OnChanges} from '@angular/core';

import { ArticlesDetailHeaderService } from './articles-detail-header.service';

import { Joiners, Vote, Joiner } from './articles-detail-header';

@Component({
  selector: 'app-articles-detail-header',
  templateUrl: './articles-detail-header.component.html',
  styleUrls: ['./articles-detail-header.component.scss'],
  providers: [ArticlesDetailHeaderService]
})

export class ArticlesDetailHeaderComponent implements OnInit {

  @Input() public showHeader: boolean = false;
  @Input() public interactId: number;
  @Input() public userId: string;
  @Input() public backFrom : string;
  @Input() public voteAmount: number = 0;

  joinId: number;

  joinsed: boolean = false;

  joiners : Joiners = new Joiners();
  vote : Vote = new Vote();
  joiner : Joiner = new Joiner();

  constructor(
    private articlesDetailHeaderService: ArticlesDetailHeaderService
  ) { }


  ngOnInit(): void {

  }

  ngOnChanges(): void{
    if(this.userId != '' && this.interactId) {
      let self = this;

      self.articlesDetailHeaderService.getJoiner(self.interactId,self.userId).then(Joiners => {
        self.joiners = Joiners;
        if(Joiners.results.length > 0) {
          self.vote = Joiners.results[0];
          self.joiner = Joiners.results[0].joiner;
          self.joinId = Joiners.results[0].id;
        }
        return self;
      });
    }
  }

  toComment(interactId: number, joinId: number) {
    if(window['WebAppInterface']) {
      if(window['WebAppInterface'].getAccessToken() == '') {
        window['WebAppInterface'].toLogin();
        return;
      }
      window['WebAppInterface'].toComment(interactId.toString(),joinId.toString());
    }
  }

  back() {
    if(this.backFrom == 'review') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].reviewBack();
      }
    } else if(this.backFrom == 'blog') {
      if(window['WebAppInterface']) {
        window['WebAppInterface'].blogBack();
      }
    }
  }

  toVote() {
    console.log(this.vote.vote)
    if(this.vote.vote == null) {
      if(!this.joinsed) {
        this.joinsed = true;
        if(!this.joinId) {
          this.articlesDetailHeaderService.joins(this.interactId).then(Vote => {

            this.vote = Vote;
            this.joiner = Vote.joiner;
            this.joinId = Vote.id;

            let self = this;

            self.vote.vote = this.vote.vote == true? null: true;

            if(self.vote.vote == true) {
              self.voteAmount++;
            } else {
              self.voteAmount--;
            }

            self.articlesDetailHeaderService.vote(self.joinId,self.vote.vote).then(Vote => {
              self.joinsed = false;
              return self;
            });

          });
        } else {
          let self = this;

          self.vote.vote = this.vote.vote == true? null: true;

          if(self.vote.vote == true) {
            self.voteAmount++;
          } else {
            self.voteAmount--;
          }

          self.articlesDetailHeaderService.vote(self.joinId,self.vote.vote).then(Vote => {
            self.joinsed = false;

            return self;
          });
        }

      }
    } else {
      if(!this.joinsed) {
        this.joinsed = true;

        this.vote.vote = this.vote.vote == true? null: true;

        if(this.vote.vote == true) {
          this.voteAmount++;
        } else {
          this.voteAmount--;
        }
        this.articlesDetailHeaderService.vote(this.joinId, this.vote.vote).then(Vote => {
          this.joinsed = false;

          return this;
        });
      }
    }

  }
}
