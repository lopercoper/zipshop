const InfoBar = ({data}) => {
return(
    <div className="d-flex gap-5 mt-4 justify-content-center">
        <div className="h6 align-self-center text-light fw-light">
          {data.post_count} posts
        </div>
        <div className="h6 align-self-center text-light fw-light">
          0 followers
        </div>
        <div className="h6 align-self-center text-light fw-light">
          0 following
        </div>
      </div>
)

}
export default InfoBar