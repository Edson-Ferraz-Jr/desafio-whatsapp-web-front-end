import './style.css';

import {
  BackgroundHeader,
  ChatContainer,
  Conversations,
  ConversationsHeader,
  Container,
  Conversation,
  ChatMessages,
  ChatMessagesHeader,
  MessagesArea,
  ChatInputContainer,
  MessageContainer,
  Message,
  ConversationOptions,
  ConversationOptionsMenu,
  ConversationOptionsMenuItem,
  ConversationsHeaderButton,
  UsersList,
  UserListItem,
  UsersListHeader,
  DirectMessagesContainer,
  UsernameInputContainer,
  JoinButton,
  MessageSender,
  MessageBalloon
} from './style';


// import ImageProfile from '../../assets/profissao-programador.jpg';
import SendMessageIcon from '../../assets/send.png';
import MenuIcon from '../../assets/menu-icon.png';
import UsersIcon from '../../assets/users-icon.png';

import React, { useEffect, useState } from 'react';
import { produce } from 'immer';


import io from 'socket.io-client';

const socket = io('http://localhost:4000');


function Main() {

  const [joinedApp, setJoinedApp] = useState(false);
  
  const [username, setUsername] = useState('');
  
  const [users, setUsers] = useState([]);

  const [predefinedGroups, setPredefinedGroups] = useState([
    'grupo1',
    'grupo2',
    'grupo3',
    'grupo4'
  ]);

  const [openedDMs, setOpenedDMs] = useState([]);

  const [groupMembers, setGroupMembers] = useState({
    grupo1: [],
    grupo2: [],
    grupo3: [],
    grupo4: []
  });

  const [messages, setMessages] = useState({
    grupo1: { messages: [], isRead: false, unreadMessages: 0 },
    grupo2: { messages: [], isRead: false, unreadMessages: 0 },
    grupo3: { messages: [], isRead: false, unreadMessages: 0 },
    grupo4: { messages: [], isRead: false, unreadMessages: 0 }
  });

  const [message, setMessage] = useState('');
  
  const [currentChat, setCurrentChat] = useState({ chatName: 'grupo1', receiverId: '', isGroup: true });
  
  const [connectedGroups, setConnectedGroups] = useState(['grupo1']);


  const [openedGroupConversationOptions, setOpenedGroupConversationOptions] = useState(undefined);
  const [openedDMConversationOptions, setOpenedDMConversationOptions] = useState(undefined);

  const [showUsersList, setShowUsersList] = useState(false);

  
  useEffect(() => {
    socket.on("connect", () => {
      
    })

    socket.on("update users", (users) => {
      setUsers(users);
    });

    socket.on("update groups members", (groupName, members) => {
      setGroupMembers(groupMembers => {
        const newGroupMembers = produce(groupMembers, draft => {
          draft[groupName] = members;
        });
        
        return newGroupMembers;
      });
    });

    
    // eslint-disable-next-line
  }, []);
  
  
  useEffect(() => {
    socket.on("new message", ({ sender, content, chatName, senderId }) => {
      setMessages(messages => {
        const newMessages = produce(messages, draft => {
          if(draft[chatName]) {
            draft[chatName].messages.push({ content, sender, senderId });
          } else {
            draft[chatName] = { messages: [{ content, sender, senderId }], isRead: false, unreadMessages: 0 };

            const newOpenedDMs = produce(openedDMs, draft => {
              draft.push({ receiverName: sender, receiverId: senderId })
            });
        
            setOpenedDMs(newOpenedDMs);
          }

          if(chatName !== currentChat.chatName) {
            draft[chatName].isRead = false;
            draft[chatName].unreadMessages++;
          }
        });
        
        
        return newMessages;
      });
    });
    

    return () => socket.off("new message");

    // eslint-disable-next-line
  }, [currentChat]);
  


  const handleJoinApp = () => {
    if(username) {
      setJoinedApp(true);

      socket.emit("join app", username);
      
      joinRoom('grupo1');
    }
  };
  

  const sendMessage = () => {
    const payload = {
      sender: username,
      to: currentChat.isGroup ? currentChat.chatName : currentChat.receiverId,
      content: message,
      chatName: currentChat.chatName,
      isGroup: currentChat.isGroup
    };

    socket.emit("send message", payload);

    const newMessages = produce(messages, draft => {
      draft[currentChat.chatName].messages.push({
        sender: username,
        content: message,
        senderId: socket.id
      });
    });

    setMessages(newMessages);

    setMessage('');
  };
  

  const joinRoom = (roomName) => {
    socket.emit("join room", roomName, (incomingMessages) => {
      const newMessages = produce(messages, draft => {
        draft[roomName].messages = incomingMessages;
      });

      setMessages(newMessages);
    });

    
    const newConnectedGroups = produce(connectedGroups, draft => {
      draft.push(roomName);
    });

    setConnectedGroups(newConnectedGroups);
  };


  const toggleChat = (selectedChat) => {
    if(!messages[selectedChat.chatName]) {
      const newMessages = produce(messages, draft => {
        draft[selectedChat.chatName] = { messages: [], isRead: true, unreadMessages: 0 };
      });

      setMessages(newMessages);
    } else {
      const newMessages = produce(messages, draft => {
        draft[selectedChat.chatName].isRead = true;
        draft[selectedChat.chatName].unreadMessages = 0;
      });
  
      setMessages(newMessages);
    }


    setCurrentChat(selectedChat);
  };
  

  const selectGroup = (groupName) => {    
    const currentChat = {
      isGroup: true,
      chatName: groupName,
      receiverId: ''
    };

    toggleChat(currentChat);
  };

  const newDM = (receiverName, receiverId) => {
    if(!openedDMs.find((element) => element.receiverId === receiverId)) {
      const newOpenedDMs = produce(openedDMs, draft => {
        draft.push({ receiverName: receiverName, receiverId: receiverId })
      });
  
      setOpenedDMs(newOpenedDMs);
    }

    selectDM(receiverName, receiverId);
  };

  const selectDM = (receiverName, receiverId) => {
    const currentChat = {
      isGroup: false,
      chatName: receiverName,
      receiverId: receiverId
    };

    toggleChat(currentChat);
  };

  const pinGroupConversation = (conversationIndex) => {
    const selectedConversation = predefinedGroups[conversationIndex];
    
    // console.log(`index: ${conversationIndex} | value: ${selectedConversation}`);

    const newPredefinedGroups = produce(predefinedGroups, draft => {
      draft.splice(conversationIndex, 1);
      draft.unshift(selectedConversation);
    });

    setPredefinedGroups(newPredefinedGroups);
  };

  const pinDMConversation = (conversationIndex) => {
    const selectedConversation = openedDMs[conversationIndex];
    
    // console.log(`index: ${conversationIndex} | value: ${selectedConversation.receiverName}`);

    const newOpenedDMs = produce(openedDMs, draft => {
      draft.splice(conversationIndex, 1);
      draft.unshift(selectedConversation);
    });

    setOpenedDMs(newOpenedDMs);
  };
  
  const showUsers = () => {
    setShowUsersList(!showUsersList);
  };
  
  const renderUsersList = () => {
    let usersList = users.filter(user => user.id !== socket.id);
    
    usersList.unshift({ id: socket.id, username: username });
    
    return (
      usersList.map((user, index) => (
        <UserListItem key={index} onClick={() => { newDM(user.username, user.id); setShowUsersList(false) }}>
          {
            user.id === socket.id ?
              <>
                <span style={{ color: '#0f0' }}>(Você)</span> {user.username}
              </>
            :
              user.username
          }
        </UserListItem>
      ))
    )
  };
  
  
  const renderDMs = () => {
    return (
      openedDMs.map((contact, index) => (
        <Conversation key={index} onClick={() => selectDM(contact.receiverName, contact.receiverId)}>
          <img src='https://placehold.co/50x50?text=image' className='image-profile' alt='' />
  
          <div className='conversation-info'>
            <span className='conversation-title'>
              {
                contact.receiverId === socket.id ?
                  <>
                    <span style={{ color: '#0f0' }}>(Você)</span> {contact.receiverName}
                  </>
                :
                  contact.receiverName
              }
            </span>
            
            <div className='conversation-details'>
              <span className='last-message'>
                {
                  // !!! Aberração temporária abaixo XD
                  messages[contact.receiverName].messages.length ?
                    `${messages[contact.receiverName].messages[messages[contact.receiverName].messages.length - 1].sender}: ${messages[contact.receiverName].messages[messages[contact.receiverName].messages.length - 1].content}`
                  :
                    ''
                }
              </span>
  
              {
                messages[contact.receiverName].unreadMessages > 0  && !messages[contact.receiverName].isRead ?
                  <span className='unread-messages'>
                    { messages[contact.receiverName].unreadMessages }
                  </span>
                :
                  ''
              }
  
              <ConversationOptions
                onClick={(e) => { setTimeout(() => { setOpenedGroupConversationOptions(index) }, 200); e.stopPropagation() }}
              
                onBlur={() => setTimeout(() => { setOpenedGroupConversationOptions(undefined) }, 200)}
              >
                <img src={MenuIcon} alt='' />
              </ConversationOptions>
  
              <ConversationOptionsMenu $conversationIndex={index} $openDropDownMenu={openedGroupConversationOptions}>
                <ConversationOptionsMenuItem onClick={() => pinDMConversation(index)}>
                  Fixar conversa
                </ConversationOptionsMenuItem>
  
                {
                  [...Array(3)].map((item, index) => (
                    <ConversationOptionsMenuItem key={index}>
                      example
                    </ConversationOptionsMenuItem>
                  ))
                }
              </ConversationOptionsMenu>
            </div>
          </div>                    
        </Conversation>
      ))
    )
  };
  



  if(!joinedApp) {
    return (
      <UsernameInputContainer>
        <BackgroundHeader />
        
        <h2>Digite seu nome</h2>
        
        <input value={username} placeholder='Nome de Usuário...' onChange={(e) => setUsername(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleJoinApp() : undefined} />

        <button onClick={() => handleJoinApp()}>Entrar</button>
      </UsernameInputContainer>
    )
  }

  return (
    <Container>
      <BackgroundHeader />

      <ChatContainer>

        <Conversations>
          <ConversationsHeader>
            <ConversationsHeaderButton onClick={() => showUsers()}>
              <img src={UsersIcon} alt='' />
            </ConversationsHeaderButton>
          </ConversationsHeader>


          {
            predefinedGroups.map((group, index) => (
              <Conversation key={index} onClick={() => selectGroup(group)}>
                <img src='https://placehold.co/50x50?text=image' className='image-profile' alt='' />

                <div className='conversation-info'>
                  <span className='conversation-title'>{ group }</span>
                  
                  <div className='conversation-details'>
                    <span className='last-message'>
                      {
                        // !!! Aberração temporária abaixo :D
                        messages[group].messages.length ?
                          `${messages[group].messages[messages[group].messages.length - 1].sender}: ${messages[group].messages[messages[group].messages.length - 1].content}`
                        :
                          ''
                      }
                    </span>

                    {
                      messages[group].unreadMessages > 0  && !messages[group].isRead ?
                        <span className='unread-messages'>
                          { messages[group].unreadMessages }
                        </span>
                      :
                        ''
                    }

                    <ConversationOptions
                      onClick={(e) => { setTimeout(() => { setOpenedDMConversationOptions(index) }, 200); e.stopPropagation() }}
                    
                      onBlur={() => setTimeout(() => { setOpenedDMConversationOptions(undefined) }, 200)}
                    >
                      <img src={MenuIcon} alt='' />
                    </ConversationOptions>

                    <ConversationOptionsMenu $conversationIndex={index} $openDropDownMenu={openedDMConversationOptions}>
                      <ConversationOptionsMenuItem onClick={() => pinGroupConversation(index)}>
                        Fixar conversa
                      </ConversationOptionsMenuItem>

                      {
                        [...Array(3)].map((item, index) => (
                          <ConversationOptionsMenuItem key={index}>
                            example
                          </ConversationOptionsMenuItem>
                        ))
                      }
                    </ConversationOptionsMenu>
                  </div>
                </div>                    
              </Conversation>
            ))
          }



          {
            openedDMs.length > 0 ?
              <DirectMessagesContainer>
                <h3>Mensagens Diretas</h3>

                { renderDMs() }
              </DirectMessagesContainer>

            :

              ''
          }
        </Conversations>


        {
          showUsersList ?

            <UsersList $showUsers={showUsersList}>
              <UsersListHeader>
                Usuários Online
              </UsersListHeader>
              
              {
                renderUsersList()
              }

            </UsersList>
          :
            <ChatMessages>
              <ChatMessagesHeader>
                <img src='https://placehold.co/50x50?text=image' className='image-profile' alt='' />

                <div className='chat-info'>
                    <span className='chat-title'>
                      {
                        currentChat.receiverId === socket.id ?
                          <>
                            <span style={{ color: '#0f0' }}>(Você)</span> {currentChat.chatName}
                          </>
                        :
                          currentChat.chatName
                      }
                    </span>
                    
                    <span className='chat-members'>
                      {
                        currentChat.isGroup ?

                          groupMembers[currentChat.chatName].map((member, index) => (
                            <span key={index}>{ member.username }{ index + 1 < groupMembers[currentChat.chatName].length ? ', ' : '' }</span>
                          ))
                        :
                            ''
                      }
                    </span>
                </div>
              </ChatMessagesHeader>

              

              <MessagesArea>
                {
                  (!currentChat.isGroup || connectedGroups.includes(currentChat.chatName)) ?
            
                    messages[currentChat.chatName].messages.map((item, index) => (
                      <MessageContainer key={index} $myMessage={item.senderId === socket.id ? true : false}>
                        <MessageBalloon $myMessage={item.senderId === socket.id ? true : false}>
                          <MessageSender>
                            { item.senderId === socket.id ? '' : item.sender }
                          </MessageSender>

                          <Message>
                            { item.content }
                          </Message>
                        </MessageBalloon>
                      </MessageContainer>
                    ))
                      
                  :

                    <JoinButton onClick={() => joinRoom(currentChat.chatName)}>
                      Entrar na Conversa
                    </JoinButton>
                }
              </MessagesArea>


              {
                (!currentChat.isGroup || connectedGroups.includes(currentChat.chatName)) ?
                  <ChatInputContainer>
                    <input className='chat-input' placeholder='Diga algo...' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? sendMessage() : undefined} />
                    <img src={SendMessageIcon} className='send-message-icon' alt='' onClick={() => sendMessage()} />
                  </ChatInputContainer>
                :
                  ''
              }
              
            </ChatMessages>
        }


        
      </ChatContainer>
    </Container>
  );
}

export default Main;
