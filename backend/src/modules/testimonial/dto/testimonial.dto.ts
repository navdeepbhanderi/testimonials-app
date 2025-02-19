export class NotificationDto {
    sender_name: string;
    reply_address: string;
    subject: string;
    message: string;
}

export class ExtraTestimonialInfoDto {
    thankyou_title: string;
    thankyou_message: string;
    question_label: string;
    max_video_duration: number;
    video_button_text: string;
    text_button_text: string;
    button_color: string;
    consent_display: string;
    consent_statement: string;
}

export class CreateTestimonialDto {
    space_name: string;
    space_logo_url: string;
    space_logo_type?: boolean;
    title: string;
    message: string;
    questions: string;
    collect_extra_info: string;
    collection_type: string;
    choose_theme: string;
    start_rating?: boolean;
    image_url: string;
    user_id: number;
    notification_info?: NotificationDto;
    extra_info?: ExtraTestimonialInfoDto;
}