import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import axios, { createRequester } from "core/apiAxios";
import wrapper from "core/store";
import { parseCookie } from "core/utils";

import DeleteKanbanForm from "components/kanban/DeleteKanbanForm";
import {
  Input,
  TextArea,
  Label,
  InputWrap,
  HorizontalRule,
} from "components/layout/Form";
import { Header, Body } from "components/layout/Page";
import { ContainerMd } from "components/layout/Container";
import { SuccessButton } from "components/layout/Button";

const EditKanban = ({ kanban }) => {
  const router = useRouter();
  const { id, seq } = router.query;
  const { token } = useSelector((state) => state);
  const dispatch = useDispatch();
  const requester = createRequester(axios, dispatch);

  const [isProgressed, setIsProgressed] = useState(false);
  const [data, setData] = useState({
    name: kanban.name,
    description: kanban.description,
  });
  const [errors, setErrors] = useState();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    setIsProgressed(true);

    try {
      await requester.patch(`/projects/${id}/kanbans/${seq}`, data, token);
      router.push(`/projects/${id}/kanbans/${seq}`);
    } catch (e) {
      const errorResponse = e.response;
      if (errorResponse.status === 400) {
        setErrors(errorResponse.data.data);
      } else if (errorResponse.status === 403) {
        alert("Use hanve no permission to do this.");
      } else {
        alert("Unknown error.");
      }
    }

    setIsProgressed(false);
  };

  const handleDelete = async () => {
    try {
      await requester.delete(`/projects/${id}/kanbans/${seq}`, token);
      router.push(`/projects/${id}/kanbans`);
    } catch (e) {
      alert("Unknown error.");
    }
  };

  return (
    <ContainerMd>
      <Header title={`Edit ${kanban.name}`} />
      <Body>
        <InputWrap>
          <Label block>Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            style={{ width: "300px" }}
            value={data.name}
            onChange={onChange}
            errors={errors}
          />
        </InputWrap>
        <InputWrap>
          <Label block>Description</Label>
          <TextArea
            id="description"
            name="description"
            style={{ height: "100px" }}
            value={data.description}
            onChange={onChange}
            errors={errors}
          />
        </InputWrap>
        {isProgressed ? (
          <SuccessButton type="button" style={{ width: "120px" }} disabled>
            Saving...
          </SuccessButton>
        ) : (
          <SuccessButton
            type="button"
            style={{ width: "120px" }}
            onClick={handleUpdate}
          >
            Save kanban
          </SuccessButton>
        )}
        <HorizontalRule />
        <DeleteKanbanForm name={kanban.name} onDelete={handleDelete} />
      </Body>
    </ContainerMd>
  );
};

EditKanban.propTypes = {
  kanban: PropTypes.shape({
    projectId: PropTypes.number.isRequired,
    sequenceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    registerDate: PropTypes.string.isRequired,
  }).isRequired,
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id, seq } = context.query;
    const cookies = parseCookie(context.req.headers.cookie);
    const requester = createRequester(
      axios,
      store.dispatch,
      cookies.REFRESH_TOKEN,
    );

    const { token } = store.getState();
    try {
      const kanbanResponse = await requester.get(
        `/projects/${id}/kanbans/${seq}`,
        token,
      );
      return {
        props: {
          kanban: kanbanResponse.data,
        },
      };
    } catch (e) {
      return {
        notFound: true,
      };
    }
  },
);

export default connect((state) => state)(EditKanban);
