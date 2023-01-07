/** @format */

import * as React from 'react'

import Chip from '@mui/joy/Chip'

import IconButton from '@mui/joy/IconButton'
import List from '@mui/joy/List'
import ListSubheader from '@mui/joy/ListSubheader'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import ListItemDecorator from '@mui/joy/ListItemDecorator'
import ListItemContent from '@mui/joy/ListItemContent'

// Icons import
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

export default function Nav() {
    return (
        <List size='sm' sx={{'--List-item-radius': '8px', '--List-gap': '4px'}}>
            <ListItem nested>
                <ListSubheader>
                    Browse
                    <IconButton
                        size='sm'
                        variant='plain'
                        color='primary'
                        sx={{'--IconButton-size': '24px', ml: 'auto'}}>
                        <KeyboardArrowDownRoundedIcon fontSize='small' color='primary' />
                    </IconButton>
                </ListSubheader>
                <List
                    aria-labelledby='nav-list-browse'
                    sx={{
                        '& .JoyListItemButton-root': {p: '8px'},
                    }}>
                    <ListItem>
                        <ListItemButton variant='soft' color='primary'>
                            <ListItemDecorator sx={{color: 'inherit'}}>
                                <PeopleRoundedIcon fontSize='small' />
                            </ListItemDecorator>
                            <ListItemContent>People</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator sx={{color: 'neutral.500'}}>
                                <AssignmentIndRoundedIcon fontSize='small' />
                            </ListItemDecorator>
                            <ListItemContent>Managing accounts</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemDecorator sx={{color: 'neutral.500'}}>
                                <ArticleRoundedIcon fontSize='small' />
                            </ListItemDecorator>
                            <ListItemContent>Policies</ListItemContent>
                            <Chip variant='soft' color='info' size='sm' sx={{borderRadius: 'sm'}}>
                                Beta
                            </Chip>
                        </ListItemButton>
                    </ListItem>
                </List>
            </ListItem>
        </List>
    )
}
