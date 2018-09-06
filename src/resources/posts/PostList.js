import BookIcon from "@material-ui/icons/Book";
import SearchIcon from "@material-ui/icons/Search";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import { withStyles } from "@material-ui/core/styles";
import React, { Children, cloneElement } from "react";
import {
  BooleanField,
  BulkActions,
  BulkDeleteAction,
  ChipField,
  Datagrid,
  DateField,
  EditButton,
  Filter,
  List,
  NumberField,
  ReferenceArrayField,
  Responsive,
  ShowButton,
  SimpleList,
  SingleFieldList,
  TextField,
  TextInput,
  translate
} from "react-admin"; // eslint-disable-line import/no-unresolved

export const PostIcon = BookIcon;

const truncate = (string, length = 10) => {
  if (string.length > length) return string.substring(0, length).trim() + "...";
  else return string;
};

const QuickFilter = translate(({ label, translate }) => (
  <Chip style={{ marginBottom: 8 }} label={translate(label)} />
));

const PostFilter = props => (
  <Filter {...props}>
    <TextInput
      label="post.list.search"
      source="q"
      alwaysOn
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon color="disabled" />
          </InputAdornment>
        )
      }}
    />
    <TextInput source="title" defaultValue="Qui tempore rerum et voluptates" />
    <QuickFilter
      label="resources.posts.fields.commentable"
      source="commentable"
      defaultValue
    />
  </Filter>
);

const styles = theme => ({
  title: {
    maxWidth: "20em",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  hiddenOnSmallScreens: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  publishedAt: { fontStyle: "italic" }
});

const PostListBulkActions = props => (
  <BulkActions {...props}>
    <BulkDeleteAction />
  </BulkActions>
);

const PostListActionToolbar = withStyles({
  toolbar: {
    alignItems: "center",
    display: "flex"
  }
})(({ classes, children, ...props }) => (
  <div className={classes.toolbar}>
    {Children.map(children, button => cloneElement(button, props))}
  </div>
));

const PostList = withStyles(styles)(({ classes, ...props }) => (
  <List
    {...props}
    bulkActions={<PostListBulkActions />}
    filters={<PostFilter />}
    // sort={{ field: "published_at", order: "DESC" }}
  >
    <Responsive
      small={
        <SimpleList
          primaryText={record => record.title}
          secondaryText={record => truncate(`${record.body}`, 80)}
          tertiaryText={record => record.User.username}
        />
      }
      medium={
        <Datagrid>
          <TextField source="title" cellClassName={classes.title} />
          <TextField source="User.username" label="User" />
          <PostListActionToolbar>
            <EditButton />
          </PostListActionToolbar>
        </Datagrid>
      }
    />
  </List>
));

export default PostList;
