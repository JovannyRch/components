import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { Cc } from './Cc';
import { EmailTemplate } from '../EmailTemplate';
import { Recipients } from './Recipients';
import { ModalBody, ModalFooter, SendEmailButton, Container } from './styled-components';
import { ModalHeader } from './ModalHeader';
import reducer, { initialState } from './reducer';
import CustomizedSnackbars from '../SnackBars';
import { getEmailsData, getEmailsDataFromTemplate } from './helpers';
import PropTypes from 'prop-types';

const isEmpty = (text) => text.length === 0;

const SUBJECT_LENGTH_LIMIT = 100;
const MESSAGE_LENGTH_LIMIT = 2000;

const ContactAgentFlow = ({ isOpen, close, title, listing, agents, context, accountType }) => {
  const data = agents;
  const [emailTemplate, setEmailTemplate] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [formState, setFormState] = useReducer(reducer, initialState);
  const [agentsSelected, setAgentsSelected] = useState(data);

  const { emails, subject, message } = formState;

  const firstUser = useMemo(() => (isEmpty(emails) ? { email: '' } : { email: emails[0] }), [
    emails
  ]);

  const isEmptySubject = isEmpty(subject.trim());
  const isEmptyMessage = isEmpty(message.trim());
  const isInvalidSubjectLength = subject.length > SUBJECT_LENGTH_LIMIT;
  const isInvalidMessageLength = message.length > MESSAGE_LENGTH_LIMIT;

  const isSendButtonDisabled =
    isEmpty(emails) ||
    isEmptySubject ||
    isEmptyMessage ||
    isInvalidSubjectLength ||
    isInvalidMessageLength ||
    isEmpty(agentsSelected);

  const handleSendDataForm = () => {
    setOpenSnackbar(true);

    if (!isSendButtonDisabled) {
      let emailsData = [];
      const hasTemplate = !!emailTemplate;
      if (!hasTemplate) {
        emailsData = getEmailsData(agentsSelected, subject, message);
      } else {
        emailsData = getEmailsDataFromTemplate(emails, agentsSelected, emailTemplate, listing);
      }

      //TODO: Send email
    }
  };

  const handleEmailsChange = useCallback((value) => setFormState({ emails: value }), []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleClose = (_, reason) => {
    if (reason && reason == 'backdropClick') close();
  };

  return (
    <React.Fragment>
      <Container open={isOpen} onClose={handleClose}>
        <ModalHeader title={title} handleClose={close} />
        <ModalBody>
          <Recipients
            agents={data}
            agentsSelected={agentsSelected}
            setAgentsSelected={setAgentsSelected}
          />
          <Cc emails={emails} onChange={handleEmailsChange} />
          <EmailTemplate
            context={context}
            listing={listing}
            agentsSelected={agentsSelected}
            user={firstUser}
            accountType={accountType}
            formState={formState}
            setFormState={setFormState}
            onChangeTemplate={setEmailTemplate}
          />
        </ModalBody>
        <ModalFooter>
          <SendEmailButton onClick={handleSendDataForm} disabled={isSendButtonDisabled}>
            Send Email
          </SendEmailButton>
        </ModalFooter>
      </Container>

      <CustomizedSnackbars
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        text={'Your email has been sent successfully'}
      />
    </React.Fragment>
  );
};

ContactAgentFlow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func,
  title: PropTypes.string,
  listing: PropTypes.object.isRequired,
  agents: PropTypes.arrayOf(PropTypes.object).isRequired,
  context: PropTypes.oneOf(['Listing Detail', 'Multi-select']),
  accountType: PropTypes.oneOf(['Client', 'Broker'])
};

ContactAgentFlow.defaultProps = {
  context: 'Listing Detail',
  accountType: 'Client',
  title: 'Contact Agent'
};

export { ContactAgentFlow };
