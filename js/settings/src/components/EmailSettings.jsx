import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  notification,
  Space,
  Divider,
  Skeleton
} from "antd";
import "react-quill/dist/quill.snow.css";

import {
  loaded,
  modal_redirect_url,
  subject,
  body,
  cc,
  bcc,
  fetchEmailValues,
  saveEmailValues,
  sendTestEmail
} from "../store/reducer/emailSlice";
import { useSelector, useDispatch } from "react-redux";

export default function EmailSettings() {
  const [saveLoading, setSaveLoading] = useState(false);
  const [testEmailLoading, setTestEmailLoading] = useState(false);
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message, description) => {
    api[type]({
      message,
      description
    });
  };

  const dispatch = useDispatch();

  let redirect_url = useSelector(modal_redirect_url);
  let email_subject = useSelector(subject);
  let email_body = useSelector(body);
  let email_cc = useSelector(cc);
  let email_bcc = useSelector(bcc);
  let fetched = useSelector(loaded);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" } /*, {'indent': '-1'}, {'indent': '+1'}*/
      ],
      ["link"] //'image'
      // ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
  ];

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "The email is not valid!"
    }
  };

  const errorCheck = () => {
    const fields = form.getFieldsValue();
    const bodyValue = fields.body.replace(/(<([^>]+)>)/gi, "");

    if (fields.subject === "" && bodyValue === "") {
      openNotificationWithIcon(
        "error",
        "Error",
        "Subject and Body are required."
      );
    } else if (fields.subject === "") {
      openNotificationWithIcon("error", "Error", "Subject is required.");
    } else if (bodyValue === "") {
      openNotificationWithIcon("error", "Error", "Body is required.");
    }
  };

  // Save Email Setting
  const formSubmit = (values) => {
    setSaveLoading(true);
    dispatch(
      saveEmailValues({
        values,
        cb: (data) => {
          setSaveLoading(false);
          if (data.status === "success") {
            openNotificationWithIcon(
              "success",
              "Success",
              "Successfully saved."
            );
          } else {
            openNotificationWithIcon("error", "Error", data?.message);
          }
        }
      })
    );
  };

  // Send Test Email
  const formSendTestEmail = ({ email }) => {
    if (typeof email !== "undefined") {
      setTestEmailLoading(true);
      dispatch(
        sendTestEmail({
          email,
          cb: (data) => {
            setTestEmailLoading(false);
            if (data.status === "success") {
              openNotificationWithIcon(
                "success",
                "Success",
                "Successfully sent."
              );
            } else {
              openNotificationWithIcon("error", "Error", data?.message);
            }
          }
        })
      );
    }
  };

  useEffect(() => {
    if (fetched === false) dispatch(fetchEmailValues());
  }, [fetched]);

  useEffect(() => {
    form.setFieldsValue({
      modal_redirect_url: redirect_url,
      subject: email_subject,
      body: email_body,
      cc_emails: email_cc,
      bcc_emails: email_bcc
    });
  }, [email_subject, email_body, email_cc]);

  return fetched === false ? (
    <Skeleton />
  ) : (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={(e) => formSubmit(e)}
        className="email-settings"
      >
        <Divider orientation="left" orientationMargin="0">
          Modal Popup
        </Divider>
        <Form.Item
          label="Redirect URL on submit"
          name="modal_redirect_url"
          tooltip="If empty, page will refresh after 1 second."
        >
          <Input />
        </Form.Item>
        <Divider orientation="left" orientationMargin="0">
          Email Settings
        </Divider>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="CC">
          <Form.List name="cc_emails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      style={{ flex: "100%" }}
                      name={[name, "cc"]}
                      rules={[{ type: "email" }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add CC
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item label="BCC">
          <Form.List name="bcc_emails">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      style={{ flex: "100%" }}
                      name={[name, "bcc"]}
                      rules={[{ type: "email" }]}
                    >
                      <Input />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add BCC
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="Body"
          name="body"
          tooltip="Tags: {customer_name}, {customer_email}, {estimated_yearly_savings}, {salesperson_name} and {salesperson_position}"
          rules={[
            {
              required: true
            },
            {
              message: "Body is required!",
              validator: (_, value) => {
                if (value.replace(/(<([^>]+)>)/gi, "")) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Some message here");
                }
              }
            }
          ]}
        >
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            preserveWhitespace
          />
        </Form.Item>

        <Form.Item label=" ">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => errorCheck()}
            loading={saveLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation="left" orientationMargin="0">
        Send a Test Email
      </Divider>
      <Form
        name="basic"
        validateMessages={validateMessages}
        style={{
          display: "flex",
          gap: "10px"
        }}
        onFinish={(e) => formSendTestEmail(e)}
      >
        <Form.Item label="Email" name="email" rules={[{ type: "email" }]}>
          <Input style={{ width: "400px" }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={testEmailLoading}>
            Send
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
