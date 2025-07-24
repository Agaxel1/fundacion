export const createSlug = (title) => {
    return title.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
};

export const insertTopicInParagraph = (index, selectedTopic, editedContent, topics) => {
    if (selectedTopic && index !== null) {
        const updatedContent = [...editedContent];
        const topic = topics.find(t => t.title === selectedTopic);
        const link = `<a href="/topic/${createSlug(topic.title)}">${topic.title}</a>`;
        updatedContent[index].content = updatedContent[index].content.replace('@@', link);
        return updatedContent; // Devuelve el contenido actualizado
    }
    return editedContent; // Devuelve el contenido original si no hay cambios
};

export const renderContent = (contentArray) => {
    return contentArray.map((section, index) => {
        switch (section.type) {
            case 'paragraph':
                return <p key={index} dangerouslySetInnerHTML={{ __html: section.content }} />;
            case 'subtitle':
                return <h3 key={index}>{section.content}</h3>;
            default:
                return null;
        }
    });
};

export const handleContentChange = (index, newText, content, topicSelectorAt) => {
    const updatedContent = [...content];
    updatedContent[index].content = newText;

    let newTopicSelectorAt = topicSelectorAt;

    if (newText.includes('@@')) {
        newTopicSelectorAt = index;
    } else if (topicSelectorAt === index) {
        newTopicSelectorAt = null;
    }

    return { updatedContent, newTopicSelectorAt };
};

export const getNewContent = (type) => {
    if (type === 'paragraph') {
        return { type: 'paragraph', content: '', text: 'Párrafo' };
    } else if (type === 'subtitle') {
        return { type: 'subtitle', content: '', text: 'Subtítulo' };
    }
    return null;
};