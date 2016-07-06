import React from 'react';
import { observer } from 'mobx-react';
import { Flex, Box } from 'reflexbox';
import { Button, Card, CardImage, Heading, Text } from 'rebass';


import LibraryView from '../components/LibraryView';
import { LibraryState } from '../state/LibraryState';
import lvstate from '../state/LibraryViewState';

import '../styles/main.css';

export default () => observer(
  <Flex className="fill-height" align={'center'}>
    <Box className="fill-height" align={'flex-start'} px={2} auto>
      <LibraryView
        className="fill-height"
        library={LibraryState}
        isExpanded={lvstate.isExpanded}
        toggle={lvstate.toggle}
      />
    </Box>
    <Box px={2} auto>
      <Card
        rounded
        width={256}
      >
        <CardImage src="http://placehold.it/320/08e/fff" />
        <Heading
          level={2}
          size={3}
        >
          Card
        </Heading>
        <Text>
          Cats like cards too
        </Text>
      </Card>
    </Box>
    <Box px={2} auto>
      <Button>Button</Button>
    </Box>
  </Flex>);
