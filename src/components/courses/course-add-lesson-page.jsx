export function AddLessonToChapter(props) {
  return (
    <div>
      <div className="row p-5" style={{ background: "white" }}>
        <div className="col-md-8">
          <h3 className="display-4"> A Lesson to a Chapter</h3>

          <form onSubmit={(e) => alert("lesson added")}>
            <div className="form-group" className={classes.root}>
              <TextField
                id="outlined-basic"
                label="Course Title"
                InputProps={{
                  readOnly: true
                }}
                variant="outlined"
                placeholder="Lesson title"
              />
            </div>
            <div className="form-group" className={classes.root}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={""}
                displayEmpty
                onChange={() => alert("tht")}
              >
                <MenuItem value="">
                  <em>Pick A Chapter</em>
                </MenuItem>
                {props.chapters.map((chapter) => (
                  <MenuItem key={chapter._id} value={chapter._id}>
                    {chapter.title}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="form-group" className={classes.root}>
              <TextField
                id="outlined-basic"
                label="Lesson Title"
                variant="outlined"
                placeholder="Lesson title"
              />
            </div>
            <div className="form-group" className={classes.root}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                multiline
                rows="3"
                placeholder="about the Chapter"
              />
            </div>
            <div className="form-group" className={classes.root}>
              <input
                style={{ display: "none" }}
                accept="video/mp4,video/x-m4v,video/"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  size="large"
                >
                  <i className="fas fa-video mr-1"></i> Upload video
                </Button>
              </label>
            </div>
            <div className="form-group" className={classes.root}>
              <Button variant="contained" color="primary" type="submit">
                Add Chapter
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
