import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { getCourseChapters } from "../store/actions/actions";

export default function FormDialog(props) {
  const [chapter, setChapter] = useState(props.currentChapter);

  const change = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    const chapterCopy = { ...chapter };
    chapterCopy[name] = value;
    setChapter(chapterCopy);
  };
  const handleEdit = () => {
    // post request to update chpater

    const url = `${process.env.REACT_APP_ENDPOINT}chapters/update/${props.chapterId}`;
    const data = {
      title: chapter.title,
      about: chapter.about,
      id: props.chapterId
    };
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        // showToast("deleted  successfully...", "error");
        getCourseChapters(props.courseId);
      })
      .catch((error) => console.log(error));
  };

  console.log(props.currentChapter);
  console.log("line 7", props.chapter);
  return (
    <div
      className="modal fade"
      id="exampleModalScrollable"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalScrollableTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalScrollableTitle">
              Edit Chapter
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <TextField
                autoFocus
                value={chapter.title}
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                placeholder="Title"
                onChange={change}
                name="title"
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                onChange={change}
                name={"about"}
                mmultiline
                row={"5"}
                value={chapter.about}
              />
            </div>
            {/* <div className="form-group">
              <Button
                variant="contained"
                variant="outlined"
                color="secondary"
                style={{ marginRight: "10px" }}
                size="large"
                component="label"
              >
                Upload File
                <input
                  multiple
                  type="file"
                  name="cover"
                  accept=".jpg, .jpeg, .png"
                  hidden
                  onChange={props.changeUpload}
                />
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                component="label"
              >
                Upload Video
                <input name="video" type="file" hidden />
              </Button>
            </div> */}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={handleEdit}
              type="button"
              className="btn btn-secondary"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
