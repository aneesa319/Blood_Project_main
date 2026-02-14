import { AlertCircle, Bot, User } from 'lucide-react';

const ChatMessage = ({ message, isUser, timestamp, isError }) => {
  const formatBotMessage = (text) => {
    if (isUser) return text;

    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-red-700 dark:text-red-300">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="font-medium text-gray-700 dark:text-gray-300">$1</em>')
      .replace(/^[\*\-\+]\s+/gm, '&#8226; ')
      .replace(/^\d+\.\s+/gm, (match) => `<span class="font-medium text-red-600 dark:text-red-400">${match}</span>`)
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    if (formatted.includes('Type A') || formatted.includes('Type B') || formatted.includes('Type AB') || formatted.includes('Type O')) {
      formatted = formatted
        .replace(/(Type [ABO]+[\+\-]*:)/g, '<div class="mt-3 mb-2"><span class="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-2 py-1 rounded-md text-sm font-semibold">$1</span></div>')
        .replace(/Rh factor/g, '<span class="font-semibold text-blue-600 dark:text-blue-400">Rh factor</span>');
    }

    return formatted;
  };

  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isError
            ? 'bg-red-100 dark:bg-red-900'
            : 'bg-gradient-to-br from-red-500 to-red-600 shadow-md'
        }`}>
          {isError ? (
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? 'order-first' : ''}`}>
        <div
          className={`rounded-xl px-4 py-3 relative shadow-sm ${
            isUser
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white ml-auto shadow-md'
              : isError
              ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 shadow-sm'
          }`}
        >
          {!isUser ? (
            <div
              className="text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatBotMessage(message) }}
            />
          ) : (
            <div className="text-sm leading-relaxed">
              {message}
            </div>
          )}
        </div>

        {timestamp && (
          <div className={`text-xs text-gray-500 dark:text-gray-400 mt-2 ${
            isUser ? 'text-right' : 'text-left'
          }`}>
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
