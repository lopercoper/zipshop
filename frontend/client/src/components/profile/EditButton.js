import { useSelector } from "react-redux";
import { useEditProfileMutation } from "endpoints/rtkQuery/profileEndpoints";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditButton = ({ states, userobj }) => {
  const { formData, setFormData } = states;
  const { state, setState } = states;
  const { userState, setUserState } = states;

  const { file, setFile } = states;
  const { editmode, response } = state;
  const { user, newdescription, newusername, image } = formData;

  const enableEdit = () => {
    setState({
      ...state,
      editmode: editmode ? false : true,
      response: "",
    });
    resetFormData();
  };
  const [editProfile, result] = useEditProfileMutation();

  const usernametaken = Boolean(response != "username is taken");

  const resetFormData = () => {
    setFormData({
      ...formData,
      newdescription: "",
      newusername: "",
      response: "",
      image:'',
      save: false,
    });
  };

  const form_data = () => {
    let form_data = new FormData();
    for (let i in formData) {
      form_data.append(i, formData[i]);
    }
    return form_data;
  };

  const resetState = () => {
    setState({
      ...state,
      editmode: false,
      response: "",
    });
  };
  const resetFile = () => {
    setFile({
      ...file,
      file:null
    });
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(form_data())
      .unwrap()
      .then((fulfilled) => {
    
        setUserState({
          ...userState,
          username: fulfilled.newusername,
          description: fulfilled.newdescription,
          pfp: states.file,
        });
      })
      resetState();
      resetFormData();
      resetFile()
      .catch((rejected) => console.error(rejected));
  };
  return (
    <>
      {(usernametaken && newusername?.length > 0) ||
      (usernametaken && newdescription?.length > 0) || 
      (usernametaken && states.file?.length > 0) ? (
        // these if statements are really bad and need to be changed
        <button
          type="submit"
          onClick={onSubmit}
          className="btn btn-sm btn-black text-light"
        >
          Save
        </button>
      ) : (
        <></>
      )}
      <button onClick={enableEdit} className="btn btn-sm btn-black text-light">
        {states.state.editmode ? "Cancel" : <FontAwesomeIcon icon={faPencil} />}
      </button>
    </>
  );
};

export default EditButton;
