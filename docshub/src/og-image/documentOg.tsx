import { convertCategory } from "@/utils/convertCategory";
import type { CollectionEntry } from "astro:content";
import defaultDocshubConfig from "docshub.config";

interface iDocumentOGTemplate {
  document: CollectionEntry<"docs">;
  imgSrc: string;
}

const DocumentOGTemplate = (props: iDocumentOGTemplate) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#111827",
        color: "#fff",
        paddingTop: "40px",
        paddingBottom: "64px",
        paddingLeft: "64px",
        paddingRight: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Logo placeholder using a green circle */}
        <img
          width={50}
          height={50}
          alt={defaultDocshubConfig().documentationTitle}
          src={`${props.imgSrc}${defaultDocshubConfig().logoUrl}`}
        />
        <h2
          style={{
            fontSize: "45px",
            fontWeight: "39px",
            fontFamily: "InterDisplay-SemiBold",
          }}
        >
          {defaultDocshubConfig().documentationTitle}
        </h2>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navigation breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "InterDisplay-Regular",
            fontSize: "30px",
            color: "#a1a1aa",
            gap: 8,
          }}
        >
          {props.document.data.category && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{convertCategory(props.document.data.category)}</span>
              <span>/</span>
            </div>
          )}
          <span>{props.document.data.title}</span>
        </div>
        {/* Document Title */}
        <h1
          style={{
            fontFamily: "InterDisplay-ExtraBold",
            fontSize: "80px",
            fontWeight: "40px",
            marginTop: "44px",
            marginBottom: "40px",
            lineHeight: "1.1",
          }}
        >
          {props.document.data.title}
        </h1>
        {/* Document Description */}
        <p
          style={{
            fontSize: "38px",
            color: "#9ca3af",
            margin: "0px",
            fontWeight: "normal",
            fontFamily: "InterDisplay-Regular",
          }}
        >
          {props.document.data.description}
        </p>
      </div>
    </div>
  );
};

export default DocumentOGTemplate;
