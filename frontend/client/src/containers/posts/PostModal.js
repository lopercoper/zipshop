import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./css/Modal.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InteractionBar from "components/interactionbar/InteractionBar";
import { splitApi } from "endpoints/rtkQuery/splitApi";
import CreateComment from "containers/comment/CreateComment";
import { useLocation } from "react-router-dom";
import { useGetPostQuery } from "endpoints/rtkQuery/postEndpoints";
import CommentSection from "containers/comment/Comments";
import PostImage from "components/Image/PostImage";
import QueryDecider from "../../components/queryfun/QueryDecider";
import UserDetails from "./UserDetails";
import TitleAndHashtags from "./TitleAndHashtags";
import PostAge from "./PostAge";
import Layout from "Layout/Layout";
const PostModal = () => {
  const [modalState, setModalState] = useState({
    show: true,
  });
  const { show } = modalState;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const { queryName } = location.state;
  const { addArgument } = location.state;
  const { updateCacheArgument } = location.state;

  const { pk } = params;

  const skipPage = !Boolean(queryName === "getPage");
  const skipPost = !Boolean(queryName === "getPost");

  const useCachedData = splitApi.endpoints.getPage.useQueryState({
    skip: skipPage,
  });
  const queryPost = useGetPostQuery(Number(pk), { skip: skipPost });
  const post = QueryDecider({ queryPost, useCachedData, pk });

  const handleClose = () => {
    setModalState({ ...modalState, show: false, skip: true });
    navigate(-1);
  };

  if (post)
    return (
      <Layout>
        <div className="">
          <Modal
            size="lg"
            contentClassName="custom-modal border-0 bg-transparent"
            show={show}
            onHide={handleClose}
          >
            <Modal.Body className="d-flex justify-content-center">
              <div className="img-wrapper">
                <PostImage
                  style={{ height: "100%", width: "100%" }}
                  image={post.image}
                />
              </div>
              <div className="sidebar d-flex flex-column bg-black ">
                <div
                  style={{
                    borderBottomStyle: "solid",
                    borderWidth: "1px",
                    paddingLeft: "1vw",
                  }}
                  className="mt-2 mb-2"
                >
                  <div className="d-flex">
                    <UserDetails user={post.user} />
                    <PostAge date={post.date} />
                  </div>

                  <div style={{ marginLeft: "2.3rem" }} className="pl-5">
                    <TitleAndHashtags post={post} />
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "1vw",
                  }}
                  className="comment-section"
                >
                  <CommentSection parent={post.pk} />
                </div>
                <div
                  style={{
                    paddingLeft: "1vw",
                    borderBottomStyle: "solid",
                    borderTopStyle: "solid",
                    borderWidth: "1px",
                  }}
                  className="mt-auto"
                >
                  <div className="pt-1 pb-1">
                    <InteractionBar
                      queryName={queryName}
                      updateCacheArgument={updateCacheArgument}
                      addArgument={addArgument}
                      post={post}
                    />
                  </div>
                </div>
                <div
                  style={{
                    paddingLeft: "1vw",
                    paddingBottom: "10px",
                    paddingTop: "10px",
                  }}
                >
                  <CreateComment parent={post} post={post.pk} />
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </Layout>
    );
};

export default PostModal;
