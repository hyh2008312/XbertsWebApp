export class Reviews {
  id : number;
  title : string;
  details : string;
  description: string;
  applicant: Applicant;
  created: string;
  cons: string;
  pros: string;
  presentation: number;
  cost_performance: number;
  usability: number;
  image: Image;
  interact : Interact;
}

export class Interact{
  id: number;
  current_join: Vote;
  vote_amount: number;
}

export class Applicant {
  id : number;
  review : Review;
  reviewer: Reviewer;
}

export class Review {
  title: string;
  id: number;
  project: Project;
  flashsale: Flashsale;
}

export class Reviewer {
  id: number;
  userprofile: Userprofile;
}

export class Project {
  buy_url: string;
  title: string;
  final_price: Currency;
}

export class Flashsale{
  sale_price: Currency;
}

export class Currency {
  amount: string;
  currency: string;
}

export class Userprofile {
  avatar : string;
  first_name : string;
  company : string;
  position : string;
  badge_point: number;
  current_user: CurrentUser;

}

export class CurrentUser {
  follow : boolean;
}

export class Image{
  image_origin: string;
  image_sm: string;
}

export class Achievement {

  answerAmount : number = 0;
  blogAmount :number = 0;
  blogApprovedAmount : number = 0;
  followeesAmount : number = 0;
  followersAmount : number = 0;
  inviteeAmount : number = 0;
  questionAmount : number = 0;
  questionAnsweredAmount : number = 0;
  questionFeatureAmount : number = 0;
  reviewFeaturedAmount : number = 0;
  shareProductAmount : number = 0;
  shareProductFeaturedAmount : number = 0;
  thumbsUpAmount : number = 0;
  trialAmount : number = 0;
}

export class Vote{
  id : any;
  vote : any = null;
}
