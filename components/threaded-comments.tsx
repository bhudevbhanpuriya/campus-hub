"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Comment } from "@/lib/mock-data"

function VoteButton({
  direction,
  active,
  onClick,
}: {
  direction: "up" | "down"
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200",
        active
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      )}
    >
      {direction === "up" ? (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      )}
    </button>
  )
}

function CommentItem({
  comment,
  depth = 0,
}: {
  comment: Comment
  depth?: number
}) {
  const [votes, setVotes] = useState(comment.votes)
  const [userVote, setUserVote] = useState(comment.userVote)
  const [showReply, setShowReply] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [collapsed, setCollapsed] = useState(false)

  const timeAgo = getTimeAgo(comment.createdAt)

  const handleVote = (direction: "up" | "down") => {
    if (userVote === direction) {
      setUserVote(null)
      setVotes(comment.votes)
    } else {
      setUserVote(direction)
      setVotes(
        comment.votes + (direction === "up" ? 1 : -1) - (userVote === "up" ? 1 : userVote === "down" ? -1 : 0)
      )
    }
  }

  return (
    <div className={cn("group/comment", depth > 0 && "ml-6 border-l border-border/30 pl-4 md:ml-10 md:pl-6")}>
      <div className="py-3">
        <div className="flex items-start gap-3">
          <img
            src={comment.author.avatar || "/placeholder.svg"}
            alt={comment.author.name}
            className="mt-0.5 h-8 w-8 flex-shrink-0 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground">
                {comment.author.name}
              </span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            {!collapsed && (
              <>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
                  {comment.content}
                </p>
                <div className="mt-2 flex items-center gap-1">
                  <VoteButton
                    direction="up"
                    active={userVote === "up"}
                    onClick={() => handleVote("up")}
                  />
                  <span
                    className={cn(
                      "min-w-[2ch] text-center text-xs font-medium",
                      votes > 0 ? "text-primary" : votes < 0 ? "text-destructive" : "text-muted-foreground"
                    )}
                  >
                    {votes}
                  </span>
                  <VoteButton
                    direction="down"
                    active={userVote === "down"}
                    onClick={() => handleVote("down")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowReply(!showReply)}
                    className="ml-2 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    Reply
                  </button>
                  {comment.replies.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setCollapsed(!collapsed)}
                      className="ml-1 flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {collapsed ? "Expand" : "Collapse"}
                    </button>
                  )}
                </div>
                {showReply && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Post
                    </button>
                  </div>
                )}
              </>
            )}
            {collapsed && (
              <button
                type="button"
                onClick={() => setCollapsed(false)}
                className="mt-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {"["} {comment.replies.length} {comment.replies.length === 1 ? "reply" : "replies"} collapsed {"]"}
              </button>
            )}
          </div>
        </div>
      </div>
      {!collapsed &&
        comment.replies.map((reply) => (
          <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
        ))}
    </div>
  )
}

export function ThreadedComments({
  comments,
  title = "Discussion",
}: {
  comments: Comment[]
  title?: string
}) {
  const [newComment, setNewComment] = useState("")
  const totalComments = countComments(comments)

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {totalComments}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Sort by:</span>
          <button type="button" className="font-medium text-primary">
            Top
          </button>
          <span>/</span>
          <button type="button" className="font-medium text-muted-foreground hover:text-foreground">
            New
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <img
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=User"
          alt="Your avatar"
          className="h-8 w-8 rounded-full"
        />
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none"
          />
          <button
            type="button"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Post
          </button>
        </div>
      </div>

      <div className="mt-6 divide-y divide-border/30">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  )
}

function countComments(comments: Comment[]): number {
  return comments.reduce((acc, c) => acc + 1 + countComments(c.replies), 0)
}

function getTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 60) return "just now"
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
