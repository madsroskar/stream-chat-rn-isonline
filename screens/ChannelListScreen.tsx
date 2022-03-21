import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View} from 'react-native';
import {ChannelList, Chat} from 'stream-chat-react-native';
import type {ChannelSort} from 'stream-chat';

import type {NavigationParametersList} from '../Navigation';
import {AppContext} from '../AppContext';
import {useStreamChat} from '../useStreamChat';

interface ChannelListScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'ChannelList'>;
}

const sort: ChannelSort = {last_message_at: -1};

const options = {
  presence: true,
  state: true,
  watch: true,
};

export const ChannelListScreen: React.FC<ChannelListScreenProps> = ({
  navigation,
}: ChannelListScreenProps) => {
  const {setChannel} = useContext(AppContext);
  const {client, i18nInstance, user} = useStreamChat();
  const filters = {
    members: {$in: [user.id]},
    type: 'messaging',
  };

  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <View style={{height: '100%'}}>
        <ChannelList
          filters={filters}
          onSelect={(channel: any) => {
            setChannel(channel);
            navigation.navigate('Channel');
          }}
          options={options}
          sort={sort}
        />
      </View>
    </Chat>
  );
};
