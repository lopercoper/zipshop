import { useGetCommentsQuery } from "endpoints/rtkQuery/commentEndpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import LikeComment from "../../components/comments/LikeComment";
import CommentReplys from "./CommentReplys";
import getQueryLength from "components/jobs/getQueryLength";
import CreateComment from "./CreateComment";
import CommentUsername from "components/comments/CommentUsername";
import CommentBody from "components/comments/CommentBody";
import DisplayPfp from "components/Image/DisplayPfp";
import LikeCount from "components/like_count/LikeCount";
import { useEffect } from "react";
const CommentSection = (prop) => {
  const parent = prop.parent;

  const [commentState, setCommentState] = useState({
    page: 1,
    skip: false,
    comments: null,
  });
  const { page, skip, comments } = commentState;

  const { data = [], isSuccess } = useGetCommentsQuery(
    { parent, page },
    { skip: skip }
  );

  const loadMoreComments = () => {
    setCommentState({ ...commentState, page: page + 1 });
  };

  useEffect(() => {
    isSuccess === true &&
      setCommentState({ ...commentState, comments: data, skip: true });
  });

  if (comments)
    return (
      <div className="comments-container ">
        {comments.data.map((comment) => (
          <div key={comment.pk}>
            {comment.parent === parent ? (
              <div className="">
                <div className="d-flex gap-1">
                  <DisplayPfp
                    pfp={process.env.REACT_APP_API_URL + comment.user.pfp}
                    style={{
                      width: "2rem",
                      height: "2em",
                      borderRadius: "100%",
                    }}
                  />
                  <CommentUsername data={comment.user} />
                  <CommentBody data={comment.body} />
                  <LikeComment comment={comment} page={page} />
                </div>
                <div className="d-flex gap-2 align-items-center">
                  <LikeCount
                    style={{
                      fontSize: "0.8rem",
                      color: "#6c757d",
                      fontWeight: "bold",
                    }}
                    data={comment}
                  />
                  <CreateComment
                    reply={true}
                    parent={comment}
                    post={comment.post}
                    page={page}
                    hideform={true}
                  />
                </div>
                <CommentReplys for={comment} />
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
        {!data.end_of_data ? (
          <div className="d-flex justify-content-center">
            <button
              onClick={() => loadMoreComments()}
              className="btn text-light"
            >
              <FontAwesomeIcon size="xl" icon={faPlusCircle} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
};
export default CommentSection;
