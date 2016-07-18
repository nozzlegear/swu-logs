
type EventType = (
    "requested" |
    "triggered" | 
    "queued" | 
    "sent" | 
    "clicked" | 
    "re_clicked" |
    "opened" | 
    "re_opened" |
    "failed_to_queue" | 
    "failed_to_send" |
    "processed" | 
    "dropped" | 
    "delivered" |
    "deferred" | 
    "bounced" | 
    "reported_as_spam" |
    "unsubscribed"
);

export interface Log
{
    object: "log";

    id: string;

    created: number;

    recipient_name: string;

    recipient_address: string;

    message: string;

    email_id: string;

    email_name: string;

    email_version: string;

    status: EventType;
}

export interface ListOptions
{
    count?: number;

    offset?: number;

    created_gt?: number;

    created_gte?: number;

    created_lt?: number;

    created_lte?: number;
}

export interface Event
{
    object: "event";

    created: number;

    type: EventType;

    message: string;
}

export interface ResendResponse
{
    success: boolean;
    status: string;
    log_id: string;
    email: {
        name: string;
        version_name: string;
    }
}