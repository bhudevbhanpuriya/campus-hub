interface Comment {
    id: string;
    username: string;
    avatar: string;
    timestamp: string;
    text: string;
    likes: number;
    replies?: Comment[];
}

interface CommentThreadProps {
    comments: Comment[];
}

function CommentItem({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) {
    return (
        <div className={`flex gap-3 ${isReply ? 'ml-12 mt-4' : 'mt-6'}`}>
            {/* Avatar */}
            <img
                src={comment.avatar}
                alt={comment.username}
                className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
            />

            {/* Comment Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">@{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>

                <p className="text-sm text-white/90 leading-relaxed mb-2">{comment.text}</p>

                {/* Actions */}
                <div className="flex items-center gap-4 text-xs">
                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        <span>{comment.likes}</span>
                    </button>

                    <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                    </button>

                    <button className="hover:text-white transition-colors">Reply</button>
                </div>

                {/* Nested Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4">
                        {comment.replies.map((reply) => (
                            <CommentItem key={reply.id} comment={reply} isReply />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export function CommentThread({ comments }: CommentThreadProps) {
    return (
        <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-8">
                Comments ({comments.length})
            </h3>

            {/* Add Comment Form */}
            <div className="flex gap-3 pb-6 border-b border-white/5">
                <img
                    src="/img.png"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                    <textarea
                        placeholder="Add a comment..."
                        className="w-full bg-transparent border-b border-white/10 focus:border-white/30 outline-none resize-none py-2 text-sm transition-colors"
                        rows={2}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button className="text-sm px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button className="text-sm px-4 py-2 rounded-md bg-white text-black hover:bg-white/90 transition-colors">
                            Comment
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="divide-y divide-white/5">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
