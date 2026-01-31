import { commentController } from "@/server/threads/comment.controller";
import { NextRequest } from "next/server";

export async function POST(
    req:NextRequest,
    {params} : {params : {threadId : string}} 
){
    return commentController.createComment(req,params.threadId);
}

export async function GET(
    req:NextRequest,
    {params} : {params : {threadId : string}} 
){
    return commentController.listComments(req,params.threadId);
}