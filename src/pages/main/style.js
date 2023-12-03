import styled from "styled-components";

import ChatMessagesBackground from '../../assets/zap.png';

export const UsernameInputContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;

    h2 {
        color: #00A884;
    }

    input {
        padding: 8px;
        font-size: 18px;
        border: 1px solid #aaa;
        border-radius: 6px;
    }
    
    input:focus {
        outline: 1px solid #00A884;
    }

    button {
        background-color: #2cd268;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
        border: none;
        padding: 10px;
        border-radius: 6px;
        cursor: pointer;
    }

    button:hover {
        background-color: #555;
    }
`;

export const Container = styled.div`
    background-color: #E2E1DE;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const BackgroundHeader = styled.div`
    background-color: #00A884;
    height: 20%;
    width: 100%;
    position: absolute;
    top: 0;
`;

export const ChatContainer = styled.div`
    width: 95%;
    max-width: 1800px;
    height: 95%;
    background-color: #FFF;
    position: absolute;
    display: flex;
`;

export const ConversationsHeader = styled.div`
    width: 100%;
    height: 80px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #F0F2F5;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ConversationsHeaderButton = styled.button`
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }

    img {
        width: 30px;
        height: auto;
    }
`;

export const UsersList = styled.div`
    display: ${ ({ $showUsers }) => $showUsers ? 'flex' : 'none' };
    flex: 1;
    background-color: #eee;
    width: 100%;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
`;

export const UsersListHeader = styled.div`
    background-color: #00A884;
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
    text-align: center;
    font-size: 20px;
`;

export const UserListItem = styled.div`
    background-color: #fff;
    width: 400px;
    padding: 20px;
    border-top: 1px solid #F0F2F5;
    border-bottom: 1px solid #F0F2F5;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

export const Conversations = styled.div`
    width: 30%;
    height: 100%;
    border-right: 1px solid #E6E6E6;
    overflow-y: scroll;
`;

export const Conversation = styled.div`
    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #F0F2F5;
    border-bottom: 1px solid #F0F2F5;
    display: flex;
    align-items: center;
    cursor: pointer;

    .image-profile {
        width: 60px;
        height: auto;
        border-radius: 50%;
    }

    .conversation-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 15px;
    }

    .conversation-title {
        font-size: 18px;
    }

    .conversation-details {
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    .last-message {
        width: 85%;
        color: #808080;
    }
    
    .unread-messages {
        width: 24px;
        height: 24px;
        background-color: #25d366;
        border-radius: 50%;
        color: #fff;
        font-size: 14px;
        text-align: center;
        align-items: center;
        display: flex;
        justify-content: center;
    }
`;

export const ConversationOptions = styled.button`
    background-color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #eee;
    }

    img {
        width: 30px;
        height: auto;
    }
`;

export const ConversationOptionsMenu = styled.div`
    display: ${ ({ $openDropDownMenu, $conversationIndex }) =>  $openDropDownMenu === $conversationIndex ? 'block' : 'none' };
    z-index: 1;
    position: absolute;
    top: 15px;
    right: 10px;
    min-width: 150px;
    height: auto;
    background-color: #fff;
    border: 2px solid #F0F2F5;
    border-radius: 8px;
`;

export const ConversationOptionsMenuItem = styled.span`
    display: block;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #eee;
    }
`;

export const DirectMessagesContainer = styled.div`
    h3 {
        background-color: #00A884;
        color: #fff;
        padding: 6px;
        text-align: center;
    }
`;

export const ChatMessages = styled.div`
    background-image: url(${ChatMessagesBackground});
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const ChatMessagesHeader = styled.div`
    width: 100%;
    height: 80px;
    background-color: #F0F2F5;

    box-sizing: border-box;
    padding: 10px;
    border-top: 1px solid #F0F2F5;
    border-bottom: 1px solid #F0F2F5;
    display: flex;
    align-items: center;

    .image-profile {
        width: 60px;
        height: auto;
        border-radius: 50%;
    }

    .chat-info {
        display: flex;
        flex-direction: column;
        margin-left: 15px;
    }

    .chat-title {
        font-size: 18px;
    }

    .chat-members {
        color: #808080;
    }
`;

export const MessagesArea = styled.div`
    max-height: 100%;
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const JoinButton = styled.button`
    width: 200px;
    background-color: #2cd268;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #555;
    }
`;

export const MessageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: ${ ({ $myMessage }) => $myMessage ? 'flex-end' : 'flex-start' };
    box-sizing: border-box;
    padding: 0 20px;
    margin: 5px 0;
`;

export const MessageBalloon = styled.div`
    background-color: ${ ({ $myMessage }) => $myMessage ? '#D9FDD3' : '#FFF' };
    padding: 7px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    row-gap: 2px;
`;


export const MessageSender = styled.span`
    color: ${ '#' + ((1<<24)*Math.random()|0).toString(16) };

    font-weight: 500;
`;

export const Message = styled.span`
    
`;

export const ChatInputContainer = styled.div`
    width: 100%;
    height: 70px;
    background-color: #F0F2F5;
    box-sizing: border-box;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .chat-input {
        background-color: #FFF;
        width: 90%;
        height: 45px;
        border: none;
        outline: none;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 4px;
        font-size: 16px;
    }

    .send-message-icon {
        width: 40px;
        height: auto;
        cursor: pointer;
    }
`;
