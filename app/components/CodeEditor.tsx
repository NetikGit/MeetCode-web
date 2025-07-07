// components/CodeEditor.tsx
"use client"
import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  const defaultCode = `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`;

  return (
    <div className="w-full h-[600px] rounded-md overflow-hidden border border-gray-700 pt-2">
      <Editor
        height="100%"
        defaultLanguage="cpp"
        defaultValue={defaultCode}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
};

export default CodeEditor;
