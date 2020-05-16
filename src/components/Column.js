import React, { Component } from 'react';
import styled from 'styled-components';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import Task from './Task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    background-color: white;
    border-radius: 2px;
    width: 220px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'inherit')}
    flex-grow: 1;
    min-height: 100px;

    display: flex;
    flex-direction: column;
`;

export default class Column extends Component {

    render() {
        const {column} = this.props;
        const taskList = this.props.tasks.map((task, index) => (
            <Task key={task.id} index={index} task={task}/>
        ));
        return (
            <Draggable 
                draggableId={column.id} 
                index={this.props.index}
            >
                {(provided) => (
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                        <Title {...provided.dragHandleProps}>
                            {column.title}
                        </Title>
                        <Droppable 
                            droppableId={column.id}
                            // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
                            isDropDisabled={this.props.isDropDisabled}
                            type="task"
                        >
                            {(provided, snapshot) => (
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {taskList}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                    </Container>
                )}
            </Draggable>
        )
    }
}
