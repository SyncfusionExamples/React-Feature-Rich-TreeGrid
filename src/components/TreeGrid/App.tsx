import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { parentsUntil, ValueType, FilterBarMode, CheckboxSelectionType, SelectionType, CommandModel, FailureEventArgs, ContextMenuClickEventArgs, getObject } from '@syncfusion/ej2-react-grids';
import { TreeGridComponent, FilterType, LoadingIndicatorModel, AggregateTemplateContext, RowPosition, AggregatesDirective, AggregateDirective, AggregateColumnsDirective, AggregateColumnDirective, ColumnModel, FilterHierarchyMode, SelectionSettingsModel, ContextMenuItem, ToolbarItems, FilterSettingsModel, EditMode, TreeGridColumn, RowDD, Aggregate, Resize, Toolbar, ColumnChooser, CommandColumn, Edit, ContextMenu, ColumnMenu, VirtualScroll, Page, PdfExport, ExcelExport, Freeze, ColumnsDirective, ColumnDirective, Filter, Sort, Reorder, Inject, ITreeData } from '@syncfusion/ej2-react-treegrid';
import { projectDetails } from './datasource';
import { ButtonComponent, CheckBoxComponent, ChipListComponent, ChipsDirective, ChipDirective } from '@syncfusion/ej2-react-buttons';
import { AppBarComponent, MenuComponent, SidebarComponent } from '@syncfusion/ej2-react-navigations';
import { AutoComplete, FieldSettingsModel  } from '@syncfusion/ej2-react-dropdowns';
import { isNullOrUndefined, DateFormatOptions, createElement, closest } from '@syncfusion/ej2-base';
import { TooltipComponent, BeforeOpenEventArgs, DialogComponent } from '@syncfusion/ej2-react-popups';
import { DatePicker } from '@syncfusion/ej2-react-calendars';
import { ListViewComponent, Virtualization } from '@syncfusion/ej2-react-lists';
import { NumericTextBox, TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { createRoot, Root } from 'react-dom/client';
import './App.css';
import './Material 3/Showcase Material3/style.css';

export const App = () => {
  let treegridInst: TreeGridComponent;
  let taskNameInput: HTMLElement;
  let taskIDInput: HTMLElement;
  let dateElement: any;
  let numericEle : any;
  let textboxInstance: TextBoxComponent;
  let dialogObj: DialogComponent;
  let click: number = 1;
  let sidebarobj = useRef(null);
  let listFields = { id: "id", text: "text" };
  let isHeaderTemplate: boolean = false;
  let startTime: number = new Date().getTime();
  let enableRtlListView : boolean = false;
  let dialogInstance: DialogComponent;
  const theme = useRef('material3');
  const displayMode = useRef('Mouse');
  let selectedFilterType: string = "FilterBar";
  let selectedFilterHierarchy: string = "Both";
  let selectedFilterBarMode: string = "OnEnter";
  let selectedIndicator: string = "Spinner";
  let selectedCheckMode: string = "Default";
  let selectionType: string = "Multiple";
  let selectNewRowPosition: string = "Top";
  let selectEditMode: string = "Row";
  const dateRules: object = { date: ['M/d/yyyy', 'Please enter a valid date']};
  let dateParams : any = { params: { format: 'M/d/yyyy' } };
  let showEditLabel: boolean = false;
  const durationIDRules: object = { required: true, number: true };
  let [searchText, setSearchText] = useState();
  const footerOrderRef = useRef<HTMLDivElement>(null);
  let menuFields: FieldSettingsModel = { text: 'text', value:'id' };
  const tooltipRefs = useRef<{ [key: string]: TooltipComponent | null }>({});
  const checkboxIdsRef = useRef<{ [key: string]: boolean }>({});
  const dropdownRefs = useRef<Record<string, DropDownListComponent>>({});
  const checkboxRefs = useRef<Record<string, CheckBoxComponent>>({});
  let [switchStates, setSwitchStates] = useState<{ [key: string]: boolean }>({});
  let [dropdownValues, setDropdownValues] = useState<{ [key: string]: string }>({});
  const [checkboxIds, setCheckboxIds] = useState<{ [key: string]: boolean }>({});
  let [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});
  const selectedListItemRef = useRef<string>("Header Settings");
  let [selectedField, setSelectedField] = useState<string | null>(null);
  const [loadingTime, setLoadingTime] = useState<number>(0);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [searchedCount, setSearchedCount] = useState<number>(0);
  let selectedItemRef = useRef<{ text: string; id: string } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
   const [isDialog, setIsDialog] = useState(false);
  const [status, setStatus] = useState(false);
  let root: Root | null = null;
  let listObj!: ListViewComponent;
  const [addedCount, setAddedCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [updatedCount, setUpdatedCount] = useState(0);
  const [selectedCount, setSelectedCount] = useState<number>(0);
  let [caseSensitiveChecked, setCaseSensitiveChecked] = useState<boolean>(false);
  let [ignoreAccentChecked, setIgnoreAccentChecked] = useState<boolean>(false);
  let [selectedOperator, setSelectedOperator] = useState<string | null>(null);
  let [selectedHierarchy, setSelectedHierarchy] = useState<FilterHierarchyMode>("Both");
  const [selectedStatus, setSelectedStatus] = useState<string>("Medium");
  const checkRefs = useRef<Record<string, CheckBoxComponent>>({});
  const [stepIndex, setStepIndex] = useState(-1);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  let menuObj: MenuComponent;
  const taskIDRules = { required: true };
  const taskNameRules = { required: true };
  const costRules = { required: true, number: true };
  let menuRef!: MenuComponent;
  let menuMobileRef!: MenuComponent;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let isResized: boolean = false;
  let isDesktop: boolean = true;
  let isMenuDesktopOpened: boolean = false;
  let isMenuMobileOpened: boolean = false;
  let menuAppBarFields = { text: ['category', 'value'], children: ['options'] };
  useEffect(() => {
    const handleWindowResize = () => {
      isResized = true;
      if (isResized && (isMenuDesktopOpened || isMenuMobileOpened)) {
        isResized = false;
        menuRef?.close();
        menuMobileRef?.close();
      }
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  const menuItems = [
    {
      category: 'LEARNING',
      options: [
        {
          icon: 'platform-image sf-icon-demos',
          link: 'https://ej2.syncfusion.com/react/demos/#/tailwind3/treegrid/treegrid-overview',
          title: 'Demos',
          about: {
            value: 'Explore our exciting product demos.',
          },
        },
        {
          icon: 'platform-image sf-icon-documentation',
          link: 'https://ej2.syncfusion.com/react/documentation/treegrid/getting-started',
          title: 'Documentation',
          about: {
            value: 'Comprehensive guides for every product.',
          },
        },
        {
          icon: 'platform-image sf-icon-blog',
          link: 'https://www.syncfusion.com/blogs/category/react',
          title: 'Blog',
          about: {
            value: 'Discover new ideas and perspectives.',
          },
        },
        {
          icon: 'platform-image sf-icon-tutorial-videos',
          link: 'https://www.syncfusion.com/tutorial-videos/react/tree-grid',
          title: 'Tutorial Videos',
          about: {
            value: 'Sharpen your skills with our tutorial videos.',
          },
        },
        {
          icon: 'platform-image sf-icon-video-guide',
          link: 'https://www.syncfusion.com/self-service-demo/react/',
          title: 'Video Guides',
          about: {
            value: 'Explore key features in minutes with our quick video guides.',
          },
          isNew: true,
        },
        {
          icon: 'platform-image sf-icon-showcase-app',
          link: 'https://www.syncfusion.com/showcase-apps/react',
          title: 'Showcase Apps',
          about: {
            value: 'Real-time apps built using our UI components.',
          },
          isNew: true,
        }
      ],
    },
  ];
  const menuTemplate = (data: any) => {
    return (
      <a
        href={data.link}
        target="_blank"
        rel="noopener noreferrer"
        className="menu-item"
        data-title={data.title}
      >
        {data.category && (
          <div className="menu-title">{data.category}</div>
        )}
        <div className="menusubitems">
          <div className="icon-spacing">
            <span className={data.icon} />
          </div>
          <span className="menu-item-title">{data.title}</span>
          {data.isNew && <span className="e-badge">NEW</span>}
        </div>
        <div className="description">{data.about?.value}</div>
      </a>
    );
  };


  const steps = [
    {
      selector: '#walk_property_settings',
      arrowPosition: 'top-right',
      content:
        (
          <div>
            <strong>TreeGrid Customizer Hub</strong> <br /> <br />
	            Click to open TreeGrid settings. Instantly adjust layout, columns, filtering, and editing options—no coding needed.
          </div>
        )
    },
    {
      selector: '.search-container',
      arrowPosition: 'top-left-center',
      content: (
        <div>
          <strong>Rapid & Customizable Search</strong><br /><br />
          Use the toolbar search to quickly find records. Enable case sensitivity or accent handling for accurate results.
        </div>
      )
    },
    {
      selector: '#walk_property_Column_Date',
      arrowPosition: 'top-left',
      content:
        (
          <div>
            <strong>Smart Column Editor </strong><br /><br />
            Click to open column settings. Modify visibility, width, and formatting with real-time updates.
          </div>
        ),
    },
    {
      selector: '.e-toolbar-left',
      arrowPosition: 'top-right',
      content: (
        <div>
          <strong>Action Quickbar</strong><br /> <br/>
          Add custom toolbar buttons to trigger actions like clear filters, expand rows, or export data—outside the TreeGrid.
        </div>
      ),
    },
    {
      selector: '#aggregate-menu',
      arrowPosition: 'right-center',
      content: (
        <div>
         <strong>Concise Data Aggregation </strong><br /> <br />
	         View and switch between priority types (Low, Medium, High) in the footer.
        </div>
      ),
    }
  ];

   useEffect(() => {
    const treegridContent = document.querySelector('.e-gridcontent');
    if (!treegridContent) return;

    const handleInteraction = (e: Event) => {
      removeWalkthrough(e);
    };

    treegridContent.addEventListener('mousedown', handleInteraction);
    treegridContent.addEventListener('scroll', handleInteraction);
    treegridContent.addEventListener('wheel', handleInteraction);

    return () => {
      treegridContent.removeEventListener('mousedown', handleInteraction);
      treegridContent.removeEventListener('scroll', handleInteraction);
      treegridContent.addEventListener('wheel', handleInteraction);
    };
  }, []);

  
 const prevPositionRef = useRef({ top: 0, left: 0 });

  // Effect to handle step change: scroll container and highlight
  useEffect(() => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;

    const step = steps[stepIndex];
    const container = document.querySelector('.e-content') as HTMLElement;
    const element = document.querySelector(step.selector) as HTMLElement;
    if (!container || !element) return;

    // Remove old highlight, add new
    document.querySelectorAll('.walkthrough-highlight').forEach(el =>
      el.classList.remove('walkthrough-highlight')
    );
    element.classList.add('walkthrough-highlight');

    // Scroll logic simplified:
    if (!step.selector.includes('Column_Date') && !step.selector.includes('aggregate')) {
      container.scrollLeft = 0;
    } else {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      let newScrollLeft = container.scrollLeft;

      const elementLeftRelative = elementRect.left - containerRect.left;
      const elementRightRelative = elementRect.right - containerRect.left;

      if (step.selector.includes('Column_Date')) {
        newScrollLeft = elementLeftRelative + container.scrollLeft - 30;
      } else {
        if (elementRect.left < containerRect.left) {
          newScrollLeft -= containerRect.left - elementRect.left + 15;
        } else if (elementRect.right > containerRect.right) {
          newScrollLeft += elementRect.right - containerRect.right + 15;
        }
      }

      newScrollLeft = Math.max(0, Math.min(newScrollLeft, container.scrollWidth - containerRect.width));

      if (newScrollLeft !== container.scrollLeft) {
        container.scrollTo({ left: newScrollLeft, behavior: 'auto' });
      }
    }
  }, [stepIndex, steps]);

  // Effect to update tooltip position and handle scroll/resize events only once
  useEffect(() => {
    const updateTooltip = () => {
      const step = steps[stepIndex];
      if (!step) return;

      const element = document.querySelector(step.selector) as HTMLElement;
      if (!element) return;

      const tooltipWidth = 350;
      const tooltipHeight = 180;
      const paddingLeftRight = 15;
      const paddingTop = 10;
      const leftPadding = 5;
      const rect = element.getBoundingClientRect();

      let top = rect.bottom + window.scrollY + paddingTop;
      let left = rect.left + window.scrollX;

      if (step.selector.includes('aggregate')) {
        top = (rect.top + window.scrollY + rect.height / 2 - tooltipHeight - paddingTop) + paddingTop;
        left = (rect.left + window.scrollX - tooltipWidth - paddingLeftRight) + leftPadding;
      }

      // Clamp values
      left = Math.min(Math.max(left, paddingLeftRight), window.innerWidth - tooltipWidth - paddingLeftRight);
      top = Math.min(Math.max(top, paddingTop), window.innerHeight + window.scrollY - tooltipHeight - paddingTop);

      // Only update state if position changes
      const prev = prevPositionRef.current;
      if (Math.abs(prev.top - top) > 1 || Math.abs(prev.left - left) > 1) {
        prevPositionRef.current = { top, left };
        setPosition({ top, left });
      }

      const isToolbar = step.selector.includes('toolbar');
      const isSettingsIcon = step.selector.includes('walk_property_settings');
      const classMap = [
        ['walkthrough-tooltip-top-right', isToolbar ? 'walkthrough-tooltip-top-left-smaller' : isSettingsIcon ? 'walkthrough-tooltip-top-right-smaller' : 'walkthrough-tooltip-top-right'],
        ['walkthrough-tooltip-top-left-center', 'walkthrough-tooltip-top-left-center-smaller']
      ];

      const tooltipElement = document.querySelector('.walkthrough-tooltip')?.children?.[0] as HTMLElement | undefined;

      if (tooltipElement) {
        classMap.forEach(([largeClass, smallClass]) => {
          if (window.innerWidth < 768) {
            if (tooltipElement.classList.contains(largeClass)) {
              tooltipElement.classList.replace(largeClass, smallClass);
            }
          } else {
            if (tooltipElement.classList.contains(smallClass)) {
              tooltipElement.classList.replace(smallClass, largeClass);
            }
          }
        });
      }


    };

    let debounceTimer: ReturnType<typeof setTimeout>;
    let hasScrolledToTooltip: boolean = false;
    const debouncedUpdate = () => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const hScrollBar = document.querySelector('.e-toolbar .e-hscroll-bar') as HTMLElement;
      const tooltip = document.querySelector('.walkthrough-tooltip');
      if (hScrollBar && tooltip && !hasScrolledToTooltip) {
        hScrollBar.scrollTo({
          left: hScrollBar.scrollWidth,
          behavior: 'auto',
        });
        hasScrolledToTooltip = true;
      }

      debounceTimer = setTimeout(updateTooltip, 100);
    };

    // Initial update
    updateTooltip();

    // Event handlers
    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('scroll', debouncedUpdate, true); // capture scroll on all ancestors

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('scroll', debouncedUpdate, true);
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [stepIndex, steps]);


  const startWalkthrough = () => setStepIndex(0);
  const nextStep = () => stepIndex < steps.length - 1 ? setStepIndex(stepIndex + 1) : endWalkthrough();
  const prevStep = () => stepIndex > 0 && setStepIndex(stepIndex - 1);
  const closeTooltip = () => endWalkthrough();
  const endWalkthrough = () => {
    document.querySelectorAll('.walkthrough-highlight').forEach((el) => el.classList.remove('walkthrough-highlight'));
    setStepIndex(-1);
  };

  const removeWalkthrough = (e: any) => {
    const tooltip = document.querySelector('.walkthrough-tooltip');
    if (tooltip && tooltip.contains(e.target)) return;
    if (tooltip) endWalkthrough();
    if (dialogInstance) {
      dialogInstance.visible = false;
    }
    if (menuObj) {
      menuObj.close();
    }
  };

  const dropdownDataSource = {
    filterBarTypeOptions: [
      { value: "CheckBox", text: "CheckBox" },
      { value: "Excel", text: "Excel" },
      { value: "FilterBar", text: "FilterBar" }
    ],
    filterHierarchyOptions: [
      { value: "Both", text: "Both" },
      { value: "Parent", text: "Parent" },
      { value: "Child", text: "Child" },
      { value: "None", text: "None" }
    ],
    columnFields: [
      'TaskID', 'TaskName', 'Priority'
    ],

    listViewData: [
      { text: 'Header Settings', id: 'list-01' },
      { text: 'Tree Grid Settings', id: 'list-02' },
      { text: 'Filter Settings', id: 'list-04' },
      { text: 'Selection Settings', id: 'list-05' },
      { text: 'Edit Settings', id: 'list-06' },
      { text: 'Web Standards', id: 'list-07' }
    ],
    indicators: [
      { value: "Spinner", text: "Spinner" },
      { value: "Shimmer", text: "Shimmer" }
    ],

    selectiontype: [
      { value: "Single", text: "Single" },
      { value: "Multiple", text: "Multiple" }
    ],

    checkboxmode: [
      { value: "Default", text: "Default" },
      { value: "ResetOnRowClick", text: "ResetOnRowClick" }
    ],


    newRowPosition: [
      { value: "Top", text: "Top" },
      { value: "Bottom", text: "Bottom" },
      { value: "Above", text: "Above" },
      { value: "Below", text: "Below" },
      { value: "Child", text: "Child" }
    ],

    editMode: [
      { value: "Row", text: "Row", isDisabled: false },
      { value: "Batch", text: "Batch", isDisabled: false },
      { value: "Dialog", text: "Dialog", isDisabled: false },       
      { value: "Cell", text: "Cell", isDisabled: false }
    ],

    editModeModified: [
      { value: "Batch", text: "Batch", isDisabled: false },
      { value: "Dialog", text: "Dialog", isDisabled: false }
    ],


    filterBarModeOptions: [
      { value: "OnEnter", text: "OnEnter" },
      { value: "Immediate", text: "Immediate" }
    ],

    modeData: [
      { text: 'Mouse', value: 'Mouse' },
      { text: 'Touch', value: 'Touch' },
    ] as KeyDataType[],

    themeData: [
      { text: 'Material3', value: 'material3' },
      { text: 'Material3 Dark', value: 'material3-dark' },
      { text: 'Fluent', value: 'fluent' },
      { text: 'Fluent Dark', value: 'fluent-dark' }
    ]
  };

  const propertyDescription: { [key: string]: string } = {
    "Enable Editing": "Allows editing the cell content in this specific column. If true, the user can modify the cell value in-place.",
    "Enable Sorting": "The allowSorting property enables the sorting of tree grid records when clicking on the column header.",
    "Enable Multi-Column Sorting": "The allowMultiSorting property enables the user to sort multiple column in the tree grid.",
    "Enable Filtering": "The allowFiltering property enables the filter bar to be displayed.",   
    "Enable Column Reordering": "The allowReordering property enables the reordering of tree grid columns by dragging and dropping columns from one index to another",
    "Enable Column Resizing": "The allowResizing property enables the resizing of tree grid columns.",
    "Allow Selection": "Various features enable selection processing in the treegrid, including drag, hover, and focus interactions.",
    "Show Column Menu": "The showColumnMenu property is set to true, it will enable the column menu options in each columns.",
    "Allow Text Wrap": "The allowTextWrap property is set to true, then text content will wrap to the next line when its text content exceeds the width of the Column Cells.",
    "Enable Alternate Row Styling": "The enableAltRow property is set to true, the tree grid will render with e-altrow CSS class to the alternative tr elements.",
    "Enable Row Hover Effect": "The enableHover property is set to true, the row hover is enabled in the Treegrid.",   
    "Enable Excel Export": "Export the Treegrid to Excel.",
    "Enable PDF Export": "Export the Treegrid to PDF",  
    "Show Toggle Button": "The showToggleButton property is set to true, then the toggle button will be showed in the column headers which can be used to group or ungroup columns by clicking them.",
    "Enable Case Sensitivity": "The enableCaseSensitivity property is set to true then searches grid records with exact match based on the filter operator. It will have no effect on number, boolean and Date fields.",
    "Ignore Accent": "The ignoreAccent property is set to true, then filter ignores the diacritic characters or accents while filtering or searching.",
    "Filter Type": "It provides various filter options such as Excel-like filtering, filter bar, and checkboxes to refine and search data efficiently.",
    "Filter Hierarchy": "It helps to decide which level of hierarchy should be filtered.",
    "Show Filter Bar Operator": "The showFilterBarOperator property is set to true, then it renders the dropdownlist component to select the operator in filterbar input.",
    "Show Filter Bar Status": "The filterBarStatus propperty is set to true, shows or hides the filtered status message on the pager.",
    "Filter Bar Mode": "Filter bar modes define how filtering is triggered in the tree grid, either manually on Enter key press (OnEnter) or automatically after a delay (Immediate).",
    "Loading Indicator Type": "Display a loading indicator while the data is being loaded.",
    "Enable Toggle Selection": "The enableToggle property is set to true, then the user can able to perform toggle for the selected row.",
    "Enable Column Selection": "The allowColumnSelection is set to true, then the user can able to select the columns.",
    "Selection Type": "Specifies the selection types: Single (selects one row or cell) and Multiple (selects multiple rows or cells).",
    "Allow Multi Row Selection": "The enableSimpleMultiRowSelection property is set to true, then the user can able to perform multiple row selection with single clicks.",
    "Allow Checkbox Selection Only": "The checkboxOnly property is set to true, then the Treegrid selection is allowed only through checkbox.",
    "Checkbox Selection Mode": "Treegrid supports row, cell, and both (row and cell) selection mode.",
    "Edit Mode": "Specifies the editing mode for the treegrid.",
    "Allow Adding Row": "The allowAdding property is set to true, new records can be added to the Treegrid.",
    "Allow Next Row Edit": "The allowNextRowEdit is set to true, editing is done to next row. By default allowNextRowEdit is set to false.",
    "New Row Position": "Specifies where a new row is added in the treegrid.",
    "Allow Editing Row": "The allowEditing is set to true, values can be updated in the existing record.",
    "Edit on Double Click": "The allowEditOnDblClick is set to false, Treegrid will not allow editing of a record on double click.",
    "Allow Delete Row": "The allowDeleting property is set to true, existing record can be deleted from the Treegrid.",
    "Show Confirmation Dialog": "The showConfirmDialog is set to false, confirm dialog does not show when batch changes are saved or discarded.",
    "Show Delete Confirmation Dialog": "The showDeleteConfirmDialog is set to true, confirm dialog will show delete action. You can also cancel delete command.",
    "Theme": "A theme is a predefined set of visual styles, including colors, fonts, and layout, that determines the look and feel of an application or website. It helps create a consistent design across the entire interface.",
    "Interaction Type": "Interaction types are the various ways users engage with a system, such as clicking, typing, or touching.",
    "Enable RTL": "RTL (Right-to-Left) refers to the text direction used in languages like Arabic and Hebrew, where text is read and written starting from the right side of the page.",
    "Sum": "Specifies sum aggregate type",
    "Export": "Export the data as a PDF or Excel file using the available export properties",
    "Scrolling": "To enhance data loading and navigation in the Treegrid.",
    "Alignment": "Alignment of the columns header and cell contents.",
    "Data Operations": "Data operations in the Treegrid help manage and organize data through sorting, filtering, grouping, and paging.",
    "Average": "Specifies average aggregate type",
    "Min": "Specifies minimum aggregate type",
    "Max": "Specifies maximum aggregate type",
    "Count": "Specifies count aggregate type",
    "Allow selection": "The allowSelection property is set to true, it allows selection of (highlight row) Treegrid records by clicking it",
    "Type": "Specifies the available filtering types, determining how data is filtered in the treegrid.",
    "Clip Mode": "Specifies how overflowed cell content is displayed in the treegrid.",
    "Freeze": "Specifies the column freeze direction in the treegrid.",
    "Header text alignment": "Define the alignment of column header which is used to align the text of column header.",
    "Cell text alignment": "Defines the alignment of the column in both header and content cells.",
    "Searching": "The allowSearching property is set to false, then it disables Searching of a particular column. By default all columns allow Searching.",
    "Display as HTML encode": "The disableHtmlEncode property is set to true, it encodes the HTML of the header and content cells.",
    "Format": "Formats the displayed value without altering the original data. Supports standard and custom number or date formats.",
    "Group by format": "The enableGroupByFormat property is set to true, then it groups the particular column by formatted values. By default no columns are group by format.",
    "Display as checkbox": "The displayAsCheckBox property is set to true, it displays the column value as a check box instead of Boolean value.",
    "Visible": "Controls column visibility in the treegrid. When visible is set to false, the column is hidden. By default, all columns are shown.",
    "Operator": "Defines the search operator for Column Chooser.",
    "Default": "This is the default checkboxMode, allowing users to select multiple rows by clicking them individually.",
    "ResetOnRowClick": "In ResetOnRowClick mode, clicking a row resets the previously selected row. Multiple rows can be selected using the CTRL or SHIFT key.",
    "Single": "Allows selection of only a row or a cell.",
    "Multiple": "Allows selection of multiple rows or cells.",
    "Dialog": "Dialog opens a pop-up dialog for editing the selected row",
    "Batch": "Batch enables multiple row edits before saving changes in bulk.",
    "Top": "Inserts the new row at the beginning of the treegrid.",
    "Bottom": "Adds the new row at the end of the treegrid.",
    "Cell_Left": "Aligns the text at left side.",
    "Cell_Right": "Aligns the text at right side.",
    "Fixed": "Freeze the column at center.",
    "None": "Does not freeze the column.",
    "Cell_Center": "Defines center alignment",
    "Cell_Justify": "Defines justify alignment",
    "yMMM": "Displays year and abbreviated month name",
    "dd/MM/yyyy": "Common date format (day-first) used in the UK, India, etc.",
    "dd.MM.yyyy": "European format using dots as separators",
    "dd/MM/yyyy_hh:mm_a": "Displays date with time in 12-hour format",
    "MM/dd/yyyy_hh:mm:ss_a": "US format with full timestamp and AM/PM",
    "Spinner": "Shows a rotating loader to indicate processing",
    "Shimmer": "Displays a shimmering effect as a placeholder until data loads.",
    "OnEnter": "Initiates filter operation after Enter key is pressed.",
    "Immediate": "Initiates filter operation after a certain time interval. By default, time interval is 1500 ms.",
    "Menu": "Specifies the filter type as menu.",
    "Checkbox": "Specifies the filter type as checkbox.",
    "Persist Selection": "The persistSelection is set to true, the Treegrid selection is maintained across all operations, and at least one column must be enabled as the primary key to persist the selection." ,
    "FilterBar": "Specifies the filter type as filterbar.",
    "Excel": "Specifies the filter type as checkbox.",
    "Selection type": "Selection types include Single (selects one row or cell) and Multiple (selects multiple rows or cells).",
    "Small": " Compact rows with minimal spacing (25px) for a tighter layout.",
    "Medium": "Balanced spacing (36px) for better readability and a comfortable view.",
    "Large": "Wide spacing (60px) for a clear and spacious data display.",
    "Both": "Displays both the horizontal and vertical grid lines.",
    "Vertical": "Displays the vertical grid lines only.",
    "Horizontal": "Displays the horizontal grid lines only."
  };

  const treegridCommonTemplates = {
    emptyMessageTemplate() {
      return (<div className='emptyRecordTemplate'>
        <img src="emptyRecordTemplate_dark.svg" className="e-emptyRecord" alt="No record" />
        <span>There is no data available to display at the moment.</span>
      </div>);
    },
    durationTemplate: (column: TreeGridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="e-icons e-clock icon" style={{ marginTop: '-2px' }}></span>
            <span>Duration</span>
          </div>             
        </div>
      )
    },
    taskNameSettings: (column: TreeGridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
        return (    
          <div className='settingsIconAlignment' style={{ marginLeft: '30px' }}>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
                    <span className="e-icons e-print-layout icon" style={{ marginTop: '-2px' }}></span>
                    <span>Task Name</span>
                  </div>                  
                </div>
        )
      },
      startDateTemplate: (column: TreeGridColumn) => {
        const align = column.headerTextAlign;
        const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
        return (
          <div className='settingsIconAlignment'>
            <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="e-icons e-timeline-today icon" style={{ marginTop: '-2px' }}></span>
            <span>Start Date</span>            
            </div>        
          </div>
        )
      },
      localeValueTemplate: (data: any) => {
        return (<div style={{ marginTop: "5px" }}><span><img style={{ width: '16px', height: '12px' }} className="country_image" src={data.image} alt={data.text} /><span> &nbsp;&nbsp; {data.text}</span></span></div>);
      },

    localizationFlagTemplate: (data: any) => {
      return (
        <span><img style={{ width: '16px', height: '12px' }} className="country_image" src={data.image} alt={data.text} /><span> &nbsp;&nbsp; {data.text}</span></span>
      );
    },

      endDateTemplate: (column: TreeGridColumn) => {
        const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText'>
            <span className="e-icons e-day icon"></span>
            <div>End Date</div>
          </div>
          <span className='iconMarginAlign'>
            <MenuComponent
              enableRtl={enableRtlListView}
              items={menuItemProperties.columnMenuDateFormatProperties}
              fields={menuFields}
              template={menuItemTemplates.menuSwitchTemplate}
              showItemOnClick={true}
              select={(args) => {
                isHeaderTemplate = true;
              }}
              cssClass="custom-menu-column-date"
            /> 
          </span>
        </div>
      )
        },

    progressSettings: (column: TreeGridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="e-icons sf-icon-progress" style={{ marginTop: '-2px' }}></span>
            <span>Progress (%) </span>
          </div>
        </div>
      )
    },
  
    estimatedCostSettings: (column: TreeGridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="sf-icon-estimated-cost icon"></span>
            <div>Estimated Cost</div>
          </div>
        </div>
      )
    },

    priorityTemplate: ({ Priority }: { Priority: string }) => {
      const priorityStyles: {
        [key: string]: {
          text: string;
          bgColor: string;
          icon: string;
          iconColor: string;
        }
      } = {
        High: { text: "High", bgColor: "#f9dedc", icon: "⬤", iconColor: "#b3261e" },
        Medium: { text: "Medium", bgColor: "#fef0e6", icon: "⬤", iconColor: "#914c00" },
        Low: { text: "Low", bgColor: "#d1ffba", icon: "⬤", iconColor: "#205107" },
      };

      const { text, bgColor, iconColor, icon } = priorityStyles[Priority] || {
        text: "Unknown", bgColor: "#f0f0f0", iconColor: "#666", icon: "❓"
      };

      return (
        <div
          className="custom-chip"
          style={{
            backgroundColor: bgColor,    // Background color applied to the chip
            color: '#000',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 14px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '400',
            gap: '8px',
            height: '19px',
            width: 'fit-content',
            border: 'none'
          }}
        >
          <span
            style={{
              color: iconColor,
              fontSize: '12px'
            }}
          >
            {icon}
          </span>
          <span>{text}</span>
        </div>
      );
    },

    costComparisonTemplate: ({ EstimatedCost, ActualCost }: { EstimatedCost: number, ActualCost: number }) => {
      const costData = [EstimatedCost, ActualCost];
      const costDifference = ActualCost - EstimatedCost;
      const isOverBudget = costDifference > 0;
      const percentageDifference = ((Math.abs(costDifference) / EstimatedCost) * 100).toFixed(2);
      return (
        <div style={{ display: "flex", alignItems: "center", marginLeft: '5px', width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Display cost difference */}
            <span>${Math.abs(costDifference).toLocaleString()}</span>
            {/* Display percentage difference with dynamic color */}
            <span style={{
                color: isOverBudget ? "red" : "green",
              }}
            >
              {`(${percentageDifference}%)`}
            </span>
            <span className={`icon-wrapper ${isOverBudget ? "icon-up" : "icon-down"}`}>
              <span className={isOverBudget ? "sf-icon-arrow-upwards icon" : "sf-icon-arrow-downwards icon"} />
            </span>
          </div>
        </div>
      );
    },
  
    actualCostSettings: (column: TreeGridColumn) => {
      const align = column.headerTextAlign;
      const justify =
        align === 'Right' ? 'flex-end' :
          align === 'Center' ? 'center' : 'flex-start';
      return (
        <div className='settingsIconAlignment'>
          <div className='settingsIconText' style={{ justifyContent: justify }}>
            <span className="sf-icon-actual-cost icon" style={{ marginTop: '-2px', fontSize: "16px" }}></span>        
            <span>Actual Cost</span>            
          </div>
        </div>
      )
    },

    progressTemplate: (props: any) => {
        return (
          <div style={{ display: "flex", alignItems: "left", marginLeft: '5px', width: "200px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ProgressBarComponent  enableRtl={enableRtlListView} id={"progress" + getObject('TaskID', props)} trackThickness={10} progressThickness={10} type='Linear' height='10' width='110px' value={getObject('Progress', props)} showProgressValue={true} cornerRadius='Round' labelStyle={{ size: "0px" }} />
              <span>{getObject('Progress', props)}%</span>
            </div>        
          </div>
        );
      },

      selectItem: () => {
      if (selectedItemRef.current && listObj) {
        listObj.selectItem({ id: selectedItemRef.current.id });
      }
    },

    listTemplate: (data: any) => {
      return (<div id="sidebarList">
        <span className="text e-text-content" id={data.text} >{data.text}</span>
      </div>);
    },

    OnSelect: (args: any) => {
      const selectedItem = args.data.text || "Header Settings";
      selectedListItemRef.current = selectedItem;
      const listContent = document.getElementById("listContent");
      const newContent = customComponentTemplates.addPropertiesInsideDialogbox(selectedItem);
      if (listContent !== null && newContent !== null) {
        root = createRoot(listContent);
        root.render(newContent);
      }
    },

    dialogObjOpen: () => {
      setShowDialog(true);
      treegridCommonTemplates.selectItem();
      const indicatorElement = document.getElementById("loadingindicator");
      if (treegridInst.filterSettings.type === "FilterBar" || treegridInst.filterSettings.type === "Menu") {
        indicatorElement!.classList.add("e-disabled");
        indicatorElement!.setAttribute("disabled", "true");
      }
    },

    dialogObjClose: () => {
      if (selectedItemRef.current && listObj) {
        listObj.unselectItem(selectedItemRef.current);
      }
      setShowDialog(false);
    },

    footerTemplate: () => {
      return (
        <div className='dialog-footer' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <ButtonComponent enableRtl={enableRtlListView} cssClass="e-link" onClick={() => treegridPrivateMethods.handleClick('Save')}>
            Save
          </ButtonComponent>
          <ButtonComponent enableRtl={enableRtlListView} cssClass="e-link" onClick={() => treegridPrivateMethods.handleClick('Apply')}>
            Apply
          </ButtonComponent>
        </div>
      );
    },

      sideBar: (): JSX.Element => {
      return (
        <div id="sblist-wrapper" className="control-section">
          <div id="sidelistwrapper">
            <div className="listmaincontent">
              <div>
                <div id="listContent" className="listcontent">
                  {customComponentTemplates.addPropertiesInsideDialogbox("Header Settings")}
                </div>
              </div>
            </div>
          </div>
          <SidebarComponent id="listSidebar" ref={sidebarobj} enableDock={true} 
            dockSize="0px" className="sidebar-list" width="350px" target=".listmaincontent" type="Auto" isOpen={true}>
            <ListViewComponent id="listSidebarList" enableRtl={enableRtlListView} ref={(list: any) => listObj = list} dataSource={dropdownDataSource.listViewData} cssClass="e-template-list" height="100%" template={treegridCommonTemplates.listTemplate} fields={listFields} select={treegridCommonTemplates.OnSelect}>
              <Inject services={[Virtualization]} />
            </ListViewComponent>
          </SidebarComponent>
        </div>
      );
    },

    settingsDialogTemplate: (): JSX.Element => {
      return (
        <div style={{ marginTop: '4px' }}>
          <span style={{ fontSize: '16px' }} id="walk_property_settings" className='e-icons e-settings icon'></span>
          <DialogComponent
            id="example_dialog"
            ref={(dialog: any) => dialogObj = dialog}
            enableRtl={enableRtlListView}
            visible={showDialog}
            isModal={true}
            header="Settings"
            height='100%'
            width='720px'
            content={treegridCommonTemplates.sideBar}
            open={treegridCommonTemplates.dialogObjOpen}
            close={treegridCommonTemplates.dialogObjClose}
            footerTemplate={treegridCommonTemplates.footerTemplate as any}
            showCloseIcon={true}
          >
          </DialogComponent>
        </div>);
    },
  };

  const handleTreeGridEvent = {

    onTreeGridCreated: () => {
      startWalkthrough();
    },

    exportComplete:(args : any) => {
        treegridInst.showColumns(['Priority']);
    },

    actionBegin: (args: any): void => {
      if ((isHeaderTemplate || (args.target && args.target.closest && args.target.closest('.e-icons.e-settings.icon'))) && args.requestType === 'sorting') {
        isHeaderTemplate = false;
        args.cancel = true;
      }
    },

    toolbarClick: (args: ContextMenuClickEventArgs): void => {
      if (args.item.id === 'clearsorting_icon') {
        treegridInst.clearSorting();
      } 
      else if (args.item.id === 'clearfilter_icon') {
        treegridInst.clearFiltering();
        setFilteredCount(0);
      }
      else if (args.item.id === 'expand_icon') {
        if(click % 2 === 0) {
          treegridInst.expandAll();
        } else {
          treegridInst.collapseAll();
        }
        click++;
      }
      else if (args.item.id === 'clear_selection') {
        treegridInst.clearSelection();
      } else if (args.item.id === 'export_pdf') {
        treegridInst?.pdfExport();
      } else if (args.item.id === 'export_excel') {
        treegridInst.hideColumns(['Priority'], 'headerText');
        treegridInst?.excelExport();
      } else if (args.item.id === 'add_icon') {
        treegridInst?.addRecord();
      } else if (args.item.id === 'export_csv') {
        treegridInst?.csvExport();
      } else if (args.item.id === "treegrid_properties") {
        customComponentTemplates.toolbarDialog("Header Settings");
      }
    },
  };

   const menuItemTemplates = {

    buttonClick: (args: any) => {
      document.getElementById('dialogbox')!.style.left = `${args.clientX}px`;
      let topPosition = document.getElementById('search_box')!.getBoundingClientRect().height + args.clientY - 10;
      document.getElementById('dialogbox')!.style.top = `${topPosition}px`;
      setStatus(true);
      dialogInstance?.show();
    },

    chipClick: (args: any) => {
      if (!treegridInst) return;
      if (args.target.textContent === "Clear search") {
        treegridInst.clearFiltering();
        treegridInst.search("");
        textboxInstance.value = "";
        dialogInstance!.hide();
      } else if (args.target.textContent === "Search") {
        if (selectedField && selectedOperator && selectedHierarchy) {
          treegridInst.searchSettings = {
            fields: [selectedField],
            operator: selectedOperator,
            ignoreCase: caseSensitiveChecked,
            hierarchyMode: selectedHierarchy,
            key: searchText,
          };
          if (!caseSensitiveChecked) {
            treegridCommonTemplates.emptyMessageTemplate();
          }
          dialogInstance!.hide();
        } else {
          console.warn("Search field and operator are required.");
        }
      }
    },


    changeCheckBox: (args: any, checkId: string, checkRefs: any) => {
      let currentRef;
      setCheckedStates((prevState) => {
        const newState: { [key: string]: boolean } = {};
        const headerCheckRefs = Object.fromEntries(
          Object.entries(checkRefs.current).filter(([key, _]) =>
            key.startsWith('Header')
          )
        );

        const cellCheckRefs = Object.fromEntries(
          Object.entries(checkRefs.current).filter(([key, _]) =>
            key.startsWith('Cell')
          )
        );
      
        currentRef = checkId.includes('Header') ? headerCheckRefs : checkId.includes('Cell') ? cellCheckRefs : checkRefs.current;
        Object.entries(currentRef).forEach(([id, ref]: [string, any]) => {
          const isChecked = id === checkId ? args.checked : false;
    
          // Update the checkbox component's checked value
          if (ref && typeof ref.checked !== "undefined") {
            ref.checked = isChecked;
          }
    
          // Update internal state
          newState[id] = isChecked;
        });
    
        checkedStates = newState;
        return newState;
      });
    },

    getLabelElement: (switchId: string | TreeGridPropertiesGroup, treeViewElement: Element | null): HTMLElement | null => {
      let labelElement: HTMLElement | null = null;
      if (typeof switchId === "object" && !isNullOrUndefined(switchId) && Array.isArray(switchId["items"])) {
        switchId["items"].some((item: any) => {
          const labelClass = item.label?.replace(/\s+/g, "") + "-custom-label";
          labelElement = treeViewElement!.querySelector('label') as HTMLElement;
          return !!labelElement;
        });
      }
      return labelElement;
    },

    beforeOpen: ((args: BeforeOpenEventArgs, switchId: string | any): void => {
      const targetElement = args.target as HTMLElement;
      const treeViewElement = targetElement.closest('.treeviewdiv');
      let labelElement: HTMLElement | null;
      let description: string;
      let labelText: string;
      if (treeViewElement) {
        if (switchId && Array.isArray(switchId["items"])) {
          labelElement = menuItemTemplates.getLabelElement(switchId, targetElement.parentElement);
          labelText = labelElement!.innerText;
          description = labelElement ? propertyDescription[labelText] : '';
        } else if (switchId.includes('switch')) {
          labelElement = targetElement.parentElement!.querySelector('label') as HTMLElement;
          labelText = labelElement!.innerText;
          description = labelElement ? propertyDescription[labelText] : '';
        } else if (switchId.includes('check')) {
          labelElement = targetElement.parentElement!.querySelector('label') as HTMLElement;
          labelText = switchId.split('_check')[0];
          description = labelElement ? propertyDescription[labelText] : '';
        } 
         else {
          labelElement = treeViewElement.querySelector(`.${switchId?.replace(/\s+/g, "")}-custom-label`)?.querySelector('label') as HTMLElement;
          labelText = switchId;
          description = labelElement ? propertyDescription[labelText] : '';
        }
        if (labelElement === null) {
          labelElement = treeViewElement.querySelector('.e-checkbox-wrapper label .e-label') as HTMLElement;
          description = labelElement ? propertyDescription[labelElement.innerText.trim()] : '';
        }
        if (description && tooltipRefs.current[labelText]) {
          tooltipRefs.current[labelText]!.content = description;
        }
      }
   }),

   columnFieldsChange: (args: any) => {
      setSelectedField(() => {
        selectedField = args.value;
        return selectedField;
      });
    },

    operatorValueChange: (args: any) => {
      setSelectedOperator(() => {
        selectedOperator = args.value;
        return selectedOperator;
      });
    },

    hierarchyValueChange: (args: any) => {
      setSelectedHierarchy(() => {
        selectedHierarchy = args.value as FilterHierarchyMode;
        return selectedHierarchy;
      });
    },

    caseSensitiveChange: (args: any) => {
      setCaseSensitiveChecked(() => {
        caseSensitiveChecked = args.checked;
        return caseSensitiveChecked;
      });
    },

    ignoreAccentChange: (args: any) => {
      setIgnoreAccentChecked(() => {
        ignoreAccentChecked = args.checked;
        return ignoreAccentChecked;
      });
    },

   handleCheckBoxCreate: (checkId: string, checkRef: any) => {
      setCheckboxIds((prevState) => {
        const updated = {
          [checkId]: checkedStates[checkId] ? checkedStates[checkId] : checkRef.current[checkId].checked
        };
        checkboxIdsRef.current = updated;
        return updated;
      });
    },
    changeSwitch: (args: any, switchId: string, data: any) => {
      setSwitchStates((prevState) => {
        const newState = {
          ...prevState,
          [switchId]: args.checked,
        };
        switchStates = newState;
        return newState;
      });
    },

    textValue: (args: any) => {
      setSearchText(() => {
        searchText = args.value;
        return searchText;
      });
    },

    gridLineCustomization: (args: any) => {
      return (
        <div style={{ marginTop: '5px' }}>
          <MenuComponent
            enableRtl={enableRtlListView}
            fields={menuFields}
            items={menuItemProperties.gridLineProperties}
            template={menuItemTemplates.menuSwitchTemplate}
            showItemOnClick={true} 
            cssClass='grid-line'
          />
        </div>
      )
    },

    createListBox: () => {
      return (
        <div className="filter-container">
          <div className="filter-row">
            <div className="search-column-group">
              <label>Search by</label>
              <DropDownListComponent
                id="search_by" key={selectedField || "TaskName"}
                dataSource={dropdownDataSource.columnFields}
                onChange={menuItemTemplates.columnFieldsChange}
                placeholder="TaskName"
                popupHeight="220px"
              />
            </div>

            <div className="search-operator-group">
              <label>Operator</label>
              <DropDownListComponent width={"100px"}
                id="search_by" key={selectedOperator}
                onChange={menuItemTemplates.operatorValueChange}
                dataSource={[
                  { text: 'equal', value: 'equal' },
                  { text: 'startswith', value: 'startswith' },
                  { text: 'endswith', value: 'endswith' },
                  { text: 'wildcard', value: 'wildcard' },
                  { text: 'like', value: 'like' },
                  { text: 'notequal', value: 'notequal' },
                ]}
                fields={{ text: 'text', value: 'value' }}
                placeholder="equal"
                popupHeight="220px"
              />
            </div>            
          </div>
          <div>
              <label style={{marginRight: "35px", fontWeight: "normal"}}>Hierarchy mode</label>
              <DropDownListComponent width={"130px"}
                id="hierarchy" key={selectedHierarchy}
                onChange={menuItemTemplates.hierarchyValueChange}
                dataSource={[
                  { text: 'Both', value: 'both' },
                  { text: 'Parent', value: 'parent' },
                  { text: 'Child', value: 'child' },
                ]}
                fields={{ text: 'text', value: 'value' }}
                placeholder="Both"
                popupHeight="220px"
              />
            </div>
          <div className="check-text">
            <label>Text Preferences</label>
            <div className="checkbox-group">
              <CheckBoxComponent id="case-sensitive"
                change={menuItemTemplates.caseSensitiveChange} checked={caseSensitiveChecked} /> &nbsp;&nbsp;
              <label style={{fontWeight: "normal"}}>Case sensitive</label> &nbsp; | &nbsp; &nbsp;
              <CheckBoxComponent
                change={menuItemTemplates.ignoreAccentChange} id="ignore-accent" checked={ignoreAccentChecked} /> &nbsp; &nbsp;
              <label style={{fontWeight: "normal"}}>Ignore accent</label>
            </div>
          </div>
        </div>
      )
    },

    dialogCreated: () => {
      dialogInstance?.hide();
    },

    dialogClose: () => {
      setStatus(false);
    },

    dialogOpen: () => {
      setStatus(true);
    },

    createDialogFooter: () => {
      return (
        <div >
          <ChipListComponent id="chip-choice" selection="Single" enableRtl={enableRtlListView} selectedChips={[1]} onClick={menuItemTemplates.chipClick}>
            <ChipsDirective>
              <ChipDirective text="Clear search" cssClass="selectchip"></ChipDirective>
              <ChipDirective text="Search" cssClass="selectchip"></ChipDirective>
            </ChipsDirective>
          </ChipListComponent>
        </div>

      )
    },

    menuTextboxSearch: () => {
      return (
        <div className="search-container">
          <TextBoxComponent
            enableRtl={enableRtlListView}
            id="search_box"
            placeholder="Search..."
            onClick={menuItemTemplates.buttonClick}
            onChange={menuItemTemplates.textValue}
            cssClass="search-input"
            ref={(text: TextBoxComponent | null) => {
              if (text) {
                textboxInstance = text;
              }
            }}
          ></TextBoxComponent>
          <DialogComponent
            enableRtl={enableRtlListView}
            ref={(dialog: any) => dialogInstance = dialog}
            id="dialogbox"
            created={menuItemTemplates.dialogCreated}
            footerTemplate={menuItemTemplates.createDialogFooter}
            content={menuItemTemplates.createListBox}
            showCloseIcon={false}
            visible={status}
            width={'300px'}
            open={menuItemTemplates.dialogOpen}
            close={menuItemTemplates.dialogClose}
            height={'270px'}
          >
          </DialogComponent>
        </div>
      )
    },


    menuSwitchTemplate: (data: any) => {
      if (!isNullOrUndefined(data.properties.iconCss)) {
        let textId = data.properties.text.replace(/\s/g, "_");
        return (<div className= {data.properties.iconCss === "e-icons e-settings icon" ? "iconviewdiv" : "treeviewdiv" }>
          <label>
            <span id={"walk_property_" + (textId || "default")} className={data.properties.iconCss}></span>
            &nbsp; {data.properties.text !== "Column Name" &&
              data.properties.text !== "Column Date" && data.properties.text !== "Column Number"
              && data.properties.text !== "Column Verified" ? data.properties.text : ""}
          </label>
        </div>);
      } else if (!isNullOrUndefined(data.checkbox)) {
        let checkId = data.properties.id.replace(/\s/g, "_") + "_check";
        return (
          <div className="treeviewdiv">
            <TooltipComponent ref={(t: any) => {
              if (t) tooltipRefs.current[data.properties.id.replace(/\s/g, "_")] = t;
            }} windowCollision={true} mouseTrail={true}
              target='.single-column-exclamation-container' enableRtl={enableRtlListView} position="RightCenter" beforeOpen={(args) => menuItemTemplates.beforeOpen(args, checkId)} >
              <div><CheckBoxComponent id={checkId} enableRtl={enableRtlListView}
                ref={(instance: any) => {
                  if (instance) {
                    checkRefs.current[checkId] = instance;
                  }
                }}
                label={data.properties.text} cssClass='custom-checkbox'
                change={(args) => {
                  menuItemTemplates.changeCheckBox(args, checkId, checkRefs);
                  data.method(args, data);
                }} checked={checkedStates[checkId] ?? data.checkbox} />
                <div className="single-column-exclamation-container" style={{ ...(enableRtlListView && { marginRight: '10px' }) }}>
                  <span className="e-icons e-circle-info icon" ></span>
                </div>
              </div>
            </TooltipComponent>
          </div>
        );
      }
      else {
        let textId = data.properties.text.replace(/\s/g, "_") + "_text";
        return (<div className="treeviewdiv">
          <div className="treeName">
            <div className="setting-row"><label style={{
              fontWeight: "normal"
            }}>{data.properties.text}</label>
            </div>
          </div>
        </div>);
      }
    },
  };

  const menuItemMethods = {
    gridLineValueChange: (args: any) => {
      if (treegridInst) {
        treegridInst.gridLines = args.event.currentTarget.innerText;
      }
    },

    singleColumnSettingsDateFormat : ((args: any) => {
      let columns = treegridInst.getColumns();
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].field === 'EndDate') {
          if (typeof treegridInst.getColumns()[i].format === 'string' || !treegridInst.getColumns()[i].format) {
            treegridInst.getColumns()[i].format = { format: '', type: 'date' };
          }          
          (treegridInst.getColumns()[i].format as DateFormatOptions).format = args.event.currentTarget.innerText;
          (treegridInst.getColumns()[i].format as DateFormatOptions).type = 'date';
          treegridInst.refreshColumns();
        }
      }
    }),

    handleFilterTypeChange: (value: any, dropRef: any) => {
      const barstatusElement = document.getElementById("barstatus");
      const filterbarmodeElement = document.getElementById("filterbarmode");
      const indicatorElement = document.getElementById("loadingindicator");
      let barStatusCheckElement = barstatusElement?.querySelector('.e-checkbox-wrapper');

      if (value === "Menu" || value === "Excel" || value === "CheckBox") {
        barStatusCheckElement!.classList.add("e-checkbox-disabled");
        barStatusCheckElement!.setAttribute("disabled", "true");
        dropRef['filterbarmode'].enabled = false;
        filterbarmodeElement!.classList.add("e-disabled");
        filterbarmodeElement!.setAttribute("disabled", "true");
        if (value === "Excel" || value === "CheckBox") {
          dropRef['loadingindicator'].enabled = true;
          indicatorElement!.classList.remove("e-disabled");
          indicatorElement!.removeAttribute("disabled");
        } else {
          if (value === "Menu") {
            dropRef['loadingindicator'].enabled = false;
            indicatorElement!.classList.add("e-disabled");
            indicatorElement!.setAttribute("disabled", "true");
          }
        }
      } else {
        barStatusCheckElement!.classList.remove("e-checkbox-disabled");
        barStatusCheckElement!.removeAttribute("disabled");
        dropRef['filterbarmode'].enabled = true;
        filterbarmodeElement!.classList.remove("e-disabled");
        filterbarmodeElement!.removeAttribute("disabled");
        if (value === "FilterBar") {
          dropRef['loadingindicator'].enabled = false;
          indicatorElement!.classList.add("e-disabled");
          indicatorElement!.setAttribute("disabled", "true");
        }
      }
    },

    disableDropdownItem: (data: any, dropRef: any, id: string) => {
      if (treegridInst.enableVirtualization || treegridInst.enableInfiniteScrolling) {
        dropRef["editmode"].dataSource = dropdownDataSource.editModeModified;
        dropRef["newrowposition"].enabled = false;
      } else {
        dropRef["editmode"].dataSource = dropdownDataSource.editMode;
        dropRef["newrowposition"].enabled = true;
      }
    },

    selectionTypeChange: (value: any, dropRef: any) => {
      const checkboxSelection = document.getElementById("checkboxonly");

      const checkboxOnlyCheckbox = checkboxSelection?.querySelector('.e-checkbox-wrapper') as HTMLElement;
      const checkboxOnlyInput = checkboxSelection?.querySelector('input[type="checkbox"]') as HTMLInputElement;

      const disableCheckbox = (checkbox: HTMLElement | null, input: HTMLInputElement | null) => {
        checkbox?.classList.add("e-checkbox-disabled");
        checkbox?.setAttribute("disabled", "true");
        if (input) input.checked = false; // uncheck if disabled
      };

      const enableCheckbox = (checkbox: HTMLElement | null) => {
        checkbox?.classList.remove("e-checkbox-disabled");
        checkbox?.removeAttribute("disabled");
      };

      switch (value) {
        case 'Single':
          enableCheckbox(checkboxOnlyCheckbox);
          setCheckboxValues((prev) => {
            Object.keys(checkboxValues).forEach((prop) => {
              checkboxValues[prop] = prev[prop];
            });
            return prev;
          });
          break;
        case 'Multiple':
          if (dropRef['checkboxmodedefault'].value !== 'ResetOnRowClick') {
            enableCheckbox(checkboxOnlyCheckbox);
          }
          break;
        case 'Default':
          enableCheckbox(checkboxOnlyCheckbox);          
          break;
        case 'ResetOnRowClick':          
          disableCheckbox(checkboxOnlyCheckbox, checkboxOnlyInput);
          break;

        default:
          break;
      }
    }
  };

  const menuItemProperties = {
    priorityOptions: [
      { text: "Low" },
      { text: "Medium" },
      { text: "High" }
    ],   
    gridLineProperties: [
      {
        iconCss: 'e-icons e-border-all',
        items: [
          { text: 'Both', id: 'Both', method: menuItemMethods.gridLineValueChange, checkbox: true },
          { text: 'Default', id: 'Default', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'Horizontal', id: 'Horizontal', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'Vertical', id: 'Vertical', method: menuItemMethods.gridLineValueChange, checkbox: false },
          { text: 'None', id: 'None', method: menuItemMethods.gridLineValueChange, checkbox: false }
        ],
      },
    ],
    
    columnMenuDateFormatProperties : [
      {
        text: 'Column Date',
        iconCss: 'e-icons e-settings icon',
        items: [
              { text: 'yMMM', id:'yMMM', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
              { text: 'dd/MM/yyyy', id: 'dd/MM/yyyy', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: true },
              { text: 'dd.MM.yyyy', id: 'dd.MM.yyyy', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
              { text: 'dd/MM/yyyy hh:mm a', id: 'dd/MM/yyyy hh:mm a', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
              { text: 'MM/dd/yyyy hh:mm:ss a', id: 'MM/dd/yyyy hh:mm:ss a', method: menuItemMethods.singleColumnSettingsDateFormat, checkbox: false },
            ]
      },
    ],
  };

  const treegridPropertiesConfigurations: TreeGridPropertiesConfigurations = {
    'Header Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'sorting', label: 'Enable Sorting', defaultChecked: true },
          { id: 'multisorting', label: 'Enable Multi-Column Sorting', defaultChecked: true },
          { id: 'filtering', label: 'Enable Filtering', defaultChecked: true },
          { id: 'reordering', label: 'Enable Column Reordering', defaultChecked: true },
          { id: 'resizing', label: 'Enable Column Resizing', defaultChecked: true }
        ]
      }
    ],
    'Tree Grid Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'selection', label: 'Allow Selection', defaultChecked: true },
          { id: 'textwrap', label: 'Allow Text Wrap', defaultChecked: false },
          { id: 'showcolumnmenu', label: 'Show Column Menu', defaultChecked: false },
          { id: 'general_treegrid', type: 'Separator' }
        ]
      },
      {
        groupField: 'Appearance & Interaction',
        items: [
          { id: 'altrow', label: 'Enable Alternate Row Styling', defaultChecked: false },
          { id: 'hover', label: 'Enable Row Hover Effect', defaultChecked: true },
          { id: 'treegrid_appearance', type: 'Separator' }
        ]
      },
      {
        groupField: 'Data Export',
        items: [
          { id: 'excelexport', label: 'Enable Excel Export', defaultChecked: true },
          { id: 'pdfexport', label: 'Enable PDF Export', defaultChecked: true }
        ]
      },
    ],


    'Filter Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'ignoreaccent', label: 'Ignore Accent', defaultChecked: false },
          { id: 'filtertype', label: 'Filter Type', marginLeft: '49%', marginRTL: '44%', type: 'dropdown', dataSource: dropdownDataSource.filterBarTypeOptions, placeholder: selectedFilterType, method: menuItemMethods.handleFilterTypeChange, value: selectedFilterType },
          { id: 'filterhierarchy', label: 'Filter Hierarchy', marginLeft: '43%', marginRTL: '44%', type: 'dropdown', dataSource: dropdownDataSource.filterHierarchyOptions, placeholder: selectedFilterHierarchy, method: menuItemMethods.handleFilterTypeChange, value: selectedFilterHierarchy },
          { id: 'treegrid_filter', type: 'Separator' }
        ]
      },
      {
        groupField: 'Filter Bar Settings',
        items: [
          { id: 'barstatus', label: 'Show Filter Bar Status', defaultChecked: false },
          { id: 'filterbarmode', label: 'Filter Bar Mode', marginLeft: '42%', marginRTL: '37%', type: 'dropdown', dataSource: dropdownDataSource.filterBarModeOptions, placeholder: selectedFilterBarMode, value: selectedFilterBarMode },
          { id: 'treegrid_filter_bar', type: 'Separator' }
        ]
      },
      {
        groupField: 'Excel / Checkbox Filter Settings',
        items: [
          { id: 'loadingindicator', label: 'Loading Indicator Type', marginLeft: '34%', marginRTL: '38%', type: 'dropdown', dataSource: dropdownDataSource.indicators, placeholder: selectedIndicator, value: selectedIndicator }
        ]
      },
    ],
    'Edit Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'editmode', label: 'Edit Mode', type: 'dropdown', dataSource: dropdownDataSource.editMode, dataFields: { text: 'text', value: 'value', disabled: 'isDisabled' }, method: menuItemMethods.disableDropdownItem, marginLeft: '48%', marginRTL: '44%', placeholder: selectEditMode, value: selectEditMode },
          { id: 'nextrowedit', label: 'Allow Next Row Edit', defaultChecked: true },
          { id: 'treegrid_edit', type: 'Separator' }
        ]
      },
      {
        groupField: 'Add Action Settings',
        items: [
          { id: 'adding', label: 'Allow Adding Row', defaultChecked: true },
          { id: 'newrowposition', label: 'New Row Position', type: 'dropdown', marginLeft: '39%', marginRTL: '33%', dataSource: dropdownDataSource.newRowPosition, placeholder: selectNewRowPosition, value: selectNewRowPosition },
          { id: 'treegrid_add', type: 'Separator' }
        ]
      },
      {
        groupField: 'Edit Action Settings',
        items: [
          { id: 'editing', label: 'Allow Editing Row', defaultChecked: true },
          { id: 'editondoubleclick', label: 'Edit on Double Click', defaultChecked: true },
          { id: 'confirmdialog', label: 'Show Confirmation Dialog', defaultChecked: true },
          { id: 'treegrid_edit', type: 'Separator' }
        ]
      },
      {
        groupField: 'Delete Action Settings',
        items: [
          { id: 'deleting', label: 'Allow Delete Row', defaultChecked: true },
          { id: 'deletedialog', label: 'Show Delete Confirmation Dialog', defaultChecked: true }
        ]
      }
    ],
    'Selection Settings': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'selectiontype', label: 'Selection Type', type: 'dropdown', marginLeft: '43%', marginRTL: '39%', method: menuItemMethods.selectionTypeChange, dataSource: dropdownDataSource.selectiontype, placeholder: selectionType, value: selectionType },
          { id: 'toggle', label: 'Enable Toggle Selection', defaultChecked: true },
          { id: 'treegrid_selection', type: 'Separator' }
        ]
      },
      {
        groupField: 'Checkbox Selection Settings',
        items: [
          { id: 'persistselection', label: 'Persist Selection', defaultChecked: true },
          { id: 'checkboxonly', label: 'Allow Checkbox Selection Only', defaultChecked: false },
          { id: 'checkboxmodedefault', label: 'Checkbox Selection Mode', type: 'dropdown', marginLeft: '29%', marginRTL: '26%', method: menuItemMethods.selectionTypeChange, dataSource: dropdownDataSource.checkboxmode, placeholder: selectedCheckMode, value: selectedCheckMode },
        ]
      }
    ],
    'Web Standards': [
      {
        groupField: 'General Settings',
        items: [
          { id: 'rtl', label: 'Enable RTL', defaultChecked: false },
          { id: 'theme', label: 'Theme', type: 'dropdown', marginLeft: '51%', marginRTL: '47%', dataSource: dropdownDataSource.themeData, placeholder: theme.current, value: theme.current },
          { id: 'interactiontype', label: 'Interaction Type', type: 'dropdown', marginLeft: '40%', marginRTL: '35%', dataSource: dropdownDataSource.modeData, placeholder: displayMode.current, value: displayMode.current }
        ]
      }
    ],
  };

  const [checkboxValues, setCheckboxValues] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};

    Object.keys(treegridPropertiesConfigurations).forEach((category) => {
      treegridPropertiesConfigurations[category as keyof TreeGridPropertiesConfigurations].forEach((item: any) => {
        if ('groupField' in item) {
          // Item is a CheckboxGroup
          const groupItems = (item as TreeGridPropertiesGroup).items;

          // Ensure groupItems is an array before iterating
          if (Array.isArray(groupItems)) {
            groupItems.forEach((checkbox) => {
              initialState[checkbox.id] = checkbox.defaultChecked ?? false;
            });
          }
        } else {
          // Item is a CheckboxConfig
          const checkbox = item as TreeGridPropertiesConfig;
          initialState[checkbox.id] = checkbox.defaultChecked ?? false;
        }
      });
    });
    return initialState;
  });

  const customComponentTemplates = {
    toolbarDialog : (selectedText: any) => {
      setIsDialog(true);
      dialogObj?.show();
      let result = dropdownDataSource.listViewData.find((item) => item.text.includes(selectedText));
      if (result && listObj) {
        selectedItemRef.current = result;
        const listContent = document.getElementById("listContent");
        const newContent = customComponentTemplates.addPropertiesInsideDialogbox(result.text);
        if (listContent !== null && newContent !== null) {
          root = createRoot(listContent);
          root.render(newContent);
        }
      }
    },

    addPropertiesInsideDialogbox: (selectedListItem: string) => {
      if (!(selectedListItem in treegridPropertiesConfigurations)) return null;
      const treegridProperties = treegridPropertiesConfigurations[selectedListItem as keyof TreeGridPropertiesConfigurations];
      if (!treegridProperties) return null;
      return (
        <div className="checkbox-group">
          {treegridProperties.map((propertyFields: any) => (
            <div className="treeviewdiv">
              <TooltipComponent ref={(t: any) => {
                if (propertyFields && Array.isArray(propertyFields["items"])) {
                  propertyFields["items"].some((item: any) => {
                    if (t) tooltipRefs.current[item.label] = t;
                  });
                } else {
                  if (t) tooltipRefs.current[propertyFields.label] = t;
                }
              }} windowCollision={true} mouseTrail={true}
                target='.exclamation-container' enableRtl={enableRtlListView} position="RightCenter" beforeOpen={(args) => menuItemTemplates.beforeOpen(args, propertyFields.label || propertyFields)}>
                {(() => {
                  return (
                    <div key={propertyFields.id || propertyFields.groupField}>
                      <div>
                        {/* Group Header */}
                        <div style={{ fontWeight: "500", fontSize: "15px",  marginBottom: "10px" }}>{propertyFields.groupField}</div>
                        {/* Render Checkboxes or Dropdown for Group */}
                        {propertyFields.items.map((item: any) => (
                          <div key={item.id} id={item.id} className={`${item.label?.replace(/\s+/g, "")}-custom-label`}>
                            {item.type === "dropdown" ? (
                              // created div element for the dropdown list element
                              <div className="dropdown-with-label">
                                {/* created div element for the dropdown label element */}
                                <div
                                  style={{
                                    display: 'flex',
                                    marginTop: '5px',
                                    gap: '10px'
                                  }}
                                >
                                  {/* created dropdown label value */}
                                  <label
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "400",
                                      lineHeight: "15px",
                                      letterSpacing: "0.24px"
                                    }}
                                    className={`${item.label.replace(/\s+/g, "")}-custom-label`}
                                  >
                                    {item.label}
                                  </label>
                                  {/* created div element for the icon symbol */}
                                <div className="exclamation-container" style={{ marginTop: '-5px' }} >
                                  <span className="e-icons e-circle-info icon"></span>
                                </div>
                                </div> 
                                {/* created dropdown component */}
                                <div style={{marginBottom:"5px"}}>
                                  <DropDownListComponent
                                    id={item.id}
                                    ref={(instance: any) => {
                                      if (instance) {
                                        dropdownRefs.current[item.id] = instance;
                                      }
                                    }}
                                    itemTemplate={item.itemTemplate}
                                    valueTemplate={item.valueTemplate}
                                    dataSource={item.dataSource}
                                    fields={item.dataFields ? item.dataFields : { text: 'text', value: 'value' }}
                                    value={dropdownValues[item.id] || item.placeholder}
                                    enableRtl={enableRtlListView}
                                    width={166}
                                    created={(e) => {
                                      treegridPrivateMethods.changeDropdownValue(item.id, dropdownValues[item.id] || item.placeholder);
                                      if (!isNullOrUndefined(item.dataFields)) {
                                        item.method(item.dataSource, dropdownRefs.current, item.id);
                                      } else if (!isNullOrUndefined(item.method)) {
                                        item.method(dropdownRefs.current[item.id].value, dropdownRefs.current);
                                      }
                                    }}
                                    change={(e) => {
                                      treegridPrivateMethods.changeDropdownValue(item.id, e.value);
                                      if (!isNullOrUndefined(item.method)) {
                                        item.method(e.value, dropdownRefs.current);
                                      }
                                    }}
                                    placeholder={item.placeholder}
                                  /></div>
                              </div>
                            ) : item.type === "Separator" ? (
                              /* Separator Element */
                              <hr className="separator-line" />
                            ) : (
                              <div id={item.id} className={`${item.label?.replace(/\s+/g, "")}-custom-label`} style={{
                                display: "flex",
                                alignItems: "center"
                              }}>
                                {/* created checkbox component if the groupfield contains in the checkbox configurations */}
                                <CheckBoxComponent
                                  id={item.id}
                                  ref={(instance: any) => {
                                    if (instance) {
                                      checkboxRefs.current[item.id] = instance;
                                    }
                                  }}
                                  label={item.label}
                                  enableRtl={enableRtlListView}
                                  checked={checkboxValues[item.id]}
                                  created={(e) => {
                                    if (!isNullOrUndefined(item.method)) {
                                      item.method(checkboxValues[item.id], item.id, checkboxRefs.current, 'Created');
                                    }
                                  }}
                                  change={(e) => {
                                    treegridPrivateMethods.handleCheckboxChange(item.id, e.checked);
                                    if (!isNullOrUndefined(item.method)) {
                                      item.method(e.checked, item.id, checkboxRefs.current, 'Change');
                                    }
                                  }}
                                />
                                &nbsp;&nbsp; &nbsp;
                                <div className="exclamation-container">
                                  <span className="e-icons e-circle-info icon"></span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </TooltipComponent>
            </div>
          ))}
        </div>
      );
    },
    taskTemplate: (props: any): JSX.Element => {
      return <span>
        BLAZ-{props.TaskID}
      </span>;
    },
  };

  const treegridFilterTemplates = {
    filterTemplate: () => {
       return (
         <span></span>
       )
     },

     createInputElement: () => createElement('input'),

     getUniqueFieldValues: (data: any[], field: string): any[] => {
      const uniqueSet = new Set(data.map(item => item[field]));
      return Array.from(uniqueSet).map(value => ({ [field]: value }));
    },
    createAutoCompleteFilter: (placeholder: string, dataSource: any[], appendElement: HTMLElement, options?: Partial<AutoComplete>) => {
      const autoComplete = new AutoComplete({
        dataSource,
        placeholder,
        change: treegridFilterTemplates.handleFilterChange,
        ...(options || {})
      });
      autoComplete.appendTo(appendElement);
    },

    taskNameFilter: { 
       create: () => taskNameInput = treegridFilterTemplates.createInputElement(),
       write: () => {
         const data = treegridFilterTemplates.getUniqueFieldValues(projectDetails, 'TaskName');
         treegridFilterTemplates.createAutoCompleteFilter('Task Name', data, taskNameInput);
       }
    },

    taskIDFilter: { 
      create: () => taskIDInput = treegridFilterTemplates.createInputElement(),
      write: () => {
        const data = treegridFilterTemplates.getUniqueFieldValues(projectDetails, 'TaskID');
        treegridFilterTemplates.createAutoCompleteFilter('Task ID', data, taskIDInput);
      }
   },

    templateOptionsDatePicker: {
      create: () => {
        dateElement = document.createElement('input');
        return dateElement;
      },
      write: (args: any) => {
        const datePickerObj = new DatePicker({
          value: new Date(args.column.field),
          format: "dd/MM/yyyy",
          placeholder: 'Select the Date',
          enableRtl: enableRtlListView,
          change: treegridFilterTemplates.handleFilterChange,
        });
        datePickerObj.appendTo(dateElement);
      },
    },

    handleFilterChange: (args: any) => {
      let targetElement = parentsUntil(args.element, 'e-filtertext');
      let columnName = targetElement.id.replace('_filterBarcell', '');
      if (args.value) {
        treegridInst.filterByColumn(columnName, 'equal', args.value);
      } else {
        treegridInst.removeFilteredColsByField(columnName);
      }
    },

    templateOptionsNumericTextBox: {
      create: () => {
        numericEle = document.createElement('input');
        return numericEle;
      },
      write: (args: any) => {
        const uniqueDurationValues = Array.from(new Set((projectDetails as { Duration: number }[]).map(emp => emp.Duration))).map(duration => ({ Duration: duration }));
        const durationNumbers = uniqueDurationValues.map(obj => obj.Duration);
        const minFreight = Math.min(...durationNumbers);
        const maxFreight = Math.max(...durationNumbers);
        const datePickerObj = new NumericTextBox({
          cssClass:'e-fltrtemp-focus',
          value: args.column.field,
          min: minFreight,
          max: maxFreight,
          enableRtl: enableRtlListView,
          change: treegridFilterTemplates.handleNumericFilterChange,
        });
        datePickerObj.appendTo(numericEle);
      },
    },

    templateOptionsCostTextBox: {
      create: () => {
        numericEle = document.createElement('input');
        return numericEle;
      },
      write: (args: any) => {
        const datePickerObj = new NumericTextBox({
          cssClass:'e-fltrtemp-focus',
          enableRtl: enableRtlListView,
          change: treegridFilterTemplates.handleNumericFilterChange,
        });
        datePickerObj.appendTo(numericEle);
      },
    },

    handleNumericFilterChange: (args: any) => {
      let targetElement;
      let columnName;
      if (!isNullOrUndefined(args.event)) {
        targetElement = parentsUntil(args.element || args.event.currentTarget, 'e-filtertext');
        columnName = targetElement ? targetElement.id.replace('_filterBarcell', '') : '';
        if (args.value) {
          treegridInst.filterByColumn(columnName, 'equal', String(args.value));
        } else {
          treegridInst.removeFilteredColsByField(columnName);
        }    
      } else {
        targetElement = '';
      }    
    }
   };

   const treegridPrivateMethods = {

    themeChanged: (value: string): void => {
      const path = `https://cdn.syncfusion.com/ej2/29.1.33/${value}.css`;
      const primaryThemeLink = document.querySelector('.theme-primary') as HTMLLinkElement;
      const body = document.body;
      body.classList.forEach(cls => {
        if (cls.endsWith('-dark') || cls.endsWith('-light') || cls.startsWith('material') || cls.startsWith('fluent')) {
          body.classList.remove(cls);
        }
      });
      // Add the new theme
      body.classList.add(value);
      primaryThemeLink.href = path;
      // Update the current theme reference
      theme.current = value;
    },

    modeChanged: (value: string): void => {
      displayMode.current = value as string;
    },

    handleCheckboxChange: (id: string, checked: boolean) => {
      setCheckboxValues((prevValues) => {
        const newValues = {
          ...prevValues,
          [id]: checked,
        };
        return newValues;
      });
    },


    // Method to dynamically change dropdown values
    changeDropdownValue: (dropdownId: string, value: string) => {
      setDropdownValues((prevState) => {
        const newState = {
          ...prevState,
          [dropdownId]: value
        };
        dropdownValues = newState;
        return newState;
      });
    },

    handleClick: (value: any) => {
      setDropdownValues((prev) => {
        if (selectedListItemRef.current === "Selection Settings") {
          treegridInst.selectionSettings.checkboxMode = prev.checkboxmodedefault as CheckboxSelectionType;
          treegridInst.selectionSettings.type = prev.selectiontype as SelectionType;
        }
        else if (selectedListItemRef.current === "Edit Settings") {
          treegridInst.editSettings.newRowPosition = prev.newrowposition as RowPosition;
          treegridInst.editSettings.mode = prev.editmode as EditMode;
        }
        else if (selectedListItemRef.current === "Filter Settings") {
          treegridInst.filterSettings.type = prev.filtertype as FilterType;
          treegridInst.filterSettings.hierarchyMode = prev.filterhierarchy as FilterHierarchyMode;
          treegridInst.filterSettings.mode = prev.filterbarmode as FilterBarMode;
          treegridInst.loadingIndicator = prev.loadingindicator as LoadingIndicatorModel;
        }
        else if (selectedListItemRef.current === "Web Standards") {
          theme.current = prev.theme;
          treegridPrivateMethods.themeChanged(theme.current);
          displayMode.current = prev.interactiontypes;
          treegridPrivateMethods.modeChanged(displayMode.current);
        }
        Object.keys(dropdownValues).forEach((prop) => {
          dropdownValues[prop] = prev[prop];
        });
        return prev;
      });
      setCheckboxValues((prev) => {
        if (selectedListItemRef.current === "Header Settings") {
          treegridInst.allowMultiSorting = prev.multisorting;
          treegridInst.allowSorting = prev.sorting;
          treegridInst.allowFiltering = prev.filtering;
          treegridInst.allowReordering = prev.reordering;
          treegridInst.allowResizing = prev.resizing;
        }
        else if (selectedListItemRef.current === "Selection Settings") {
          treegridInst.selectionSettings.checkboxOnly = prev.checkboxonly;
          treegridInst.selectionSettings.persistSelection = prev.persistselection;
          treegridInst.selectionSettings.enableToggle = prev.toggle;
        }
        else if (selectedListItemRef.current === "Edit Settings") {
          treegridInst.editSettings.allowAdding = prev.adding;
          treegridInst.editSettings.allowDeleting = prev.deleting;
          treegridInst.editSettings.allowEditOnDblClick = prev.editondoubleclick;
          treegridInst.editSettings.allowEditing = prev.editing;
          treegridInst.editSettings.allowNextRowEdit = prev.nextrowedit;
          treegridInst.editSettings.showConfirmDialog = prev.confirmdialog;
          treegridInst.editSettings.showDeleteConfirmDialog = prev.deletedialog;
        }
        else if (selectedListItemRef.current === "Filter Settings") {
          if (treegridInst.enableInfiniteScrolling) {
            treegridInst.infiniteScrollSettings = {
              enableCache: true, maxBlocks: 3, initialBlocks: 3
            };
            treegridInst.enableInfiniteScrolling = prev.enableinfinitescrolling;
          } else {
            treegridInst.enableInfiniteScrolling = prev.enableinfinitescrolling;
          }
          treegridInst.filterSettings.ignoreAccent = prev.ignoreaccent;
          treegridInst.filterSettings.showFilterBarStatus = prev.barstatus;
          if (treegridInst.filterSettings.showFilterBarStatus) {
            let columns = treegridInst.getColumns();
            columns.forEach((col: any) => {
              if (col.field === 'TaskName') {
                col.filter = { operator: 'contains' };
              }
            });
          }
        }        
        else if (selectedListItemRef.current === "Tree Grid Settings") {          
          treegridInst.allowTextWrap = prev.textwrap;
          treegridInst.showColumnMenu = prev.showcolumnmenu;
          treegridInst.enableAltRow = prev.altrow;
          if (treegridInst.enableAltRow) {
            treegridInst.enableAltRow = prev.altrow;
            let styleTag = document.getElementById("altrow-style") as HTMLStyleElement;
            if (prev.altrow) {
              if (!styleTag) {
                styleTag = document.createElement("style");
                styleTag.id = "altrow-style";
                document.head.appendChild(styleTag);
              }
              styleTag.innerHTML = `.e-grid .e-altrow { background-color: #B3F0E6 !important; }`;
            } else {
              if (styleTag) {
                styleTag.remove();
              }
            }
          }
          treegridInst.allowExcelExport = prev.excelexport;
          const toolbarExcelItem = document.getElementById("export_excel");
          if (!prev.excelexport) {
            toolbarExcelItem!.classList.add("e-disabled");
            toolbarExcelItem!.setAttribute("disabled", "true");
          } else {
            toolbarExcelItem!.classList.remove("e-disabled");
            toolbarExcelItem!.removeAttribute("disabled");
          }
          treegridInst.allowPdfExport = prev.pdfexport;
          const toolbarPdfItem = document.getElementById("export_pdf");
          if (!prev.pdfexport) {
            toolbarPdfItem!.classList.add("e-disabled");
            toolbarPdfItem!.setAttribute("disabled", "true");
          } else {
            toolbarPdfItem!.classList.remove("e-disabled");
            toolbarPdfItem!.removeAttribute("disabled");
          }
          treegridInst.allowSelection = prev.selection;
          treegridInst.enableHover = prev.hover;
          treegridInst.enableInfiniteScrolling = prev.enableinfinitescrolling;
        }
        else if (selectedListItemRef.current === "Web Standards") {
          enableRtlListView = prev.rtl;
          dialogObj.enableRtl = prev.rtl;
          treegridInst.enableRtl = prev.rtl;
          listObj.enableRtl = prev.rtl;
          Object.keys(dropdownRefs.current).forEach((key) => {
            dropdownRefs.current[key].enableRtl = prev.rtl;
          });
          Object.keys(checkboxRefs.current).forEach((key) => {
            checkboxRefs.current[key].enableRtl = prev.rtl;
          });
        }

        Object.keys(checkboxValues).forEach((prop) => {
          checkboxValues[prop] = prev[prop];
        });
        return prev;
      });

      if (value === "Save") {
        dialogObj?.hide();
      }
    },

    sortComparer: (reference: ValueType, comparer: ValueType): number => {
      if (typeof reference === "string" && typeof comparer === "string") {
        return reference.localeCompare(comparer);
      }
      if (typeof reference === "number" && typeof comparer === "number") {
        return reference - comparer;
      }
      if (reference instanceof Date && comparer instanceof Date) {
        return reference.getTime() - comparer.getTime();
      }
      if (typeof reference === "boolean" && typeof comparer === "boolean") {
        return Number(reference) - Number(comparer);
      }
      return 0;
    },
  };

  

  const treegridAggregateTemplates = {

    footerCountTemplate: (props: AggregateTemplateContext): JSX.Element => {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="e-icons e-timeline-today icon" style={{ fontSize: '18px' }}></span>
          <span style={{ color: '#1C1B1F', fontSize: '14px', fontWeight: 'bold', marginLeft: '5px' }}>
            Maximum Date:
            <span style={{ color: '#B3261E', fontSize: '14px', fontWeight: '700', marginLeft: '5px' }}>
              {(props as { Max?: number }).Max} 
            </span>
          </span>
        </div>
      )
    },

    customAggregateFunction: (data : any) => {
      let lowCount = 0;
      let mediumCount = 0;
      let highCount = 0;
      if(!isNullOrUndefined(data.result)) {
        data.result.forEach((item: any) => {
          if (item.Priority === 'Low') lowCount++;
          if (item.Priority === 'Medium') mediumCount++;
           if (item.Priority === 'High') highCount++;
        });
      } else {
        data.forEach((item: any) => {
          if (item.Priority === 'Low') lowCount++;
          if (item.Priority === 'Medium') mediumCount++;
           if (item.Priority === 'High') highCount++;
        });
      }
      
      return { low: lowCount, medium: mediumCount, high: highCount };
    },

      footerPriorityTemplate: (props: any) => {
        return (    
          <div id="aggregate-menu" className="container">
          <div style={{ marginBottom: "-1px" }}>
          <DropDownListComponent style={{ color: "black" }}
                dataSource={menuItemProperties.priorityOptions}
                fields={{ text: "text", value: "text" }}
                value={selectedStatus}
                width={100}
                change={(args) => {
                  let newStatus = args.value;
                  setSelectedStatus(newStatus);
                  if (footerOrderRef.current) {
                    if (newStatus === 'Medium') {
                      footerOrderRef.current.innerText = props.Custom.medium;
                    } else if (newStatus === 'Low') {
                      footerOrderRef.current.innerText = props.Custom.low;
                    } else if (newStatus === 'High') {
                      footerOrderRef.current.innerText = props.Custom.high;
                    }
                  }
    
                }}
                placeholder="Medium"
              />
          </div>
          <div style={{ color: "black"}}>:</div>
          <div className="number" ref={footerOrderRef} style={{ textAlign: "left", width: "30%" }}>
            {props.Custom.medium}</div>
        </div>
        );
      }
  };

  const treegridProperties = {
    filterOptions: { showFilterBarOperator: true, showFilterBarStatus: false } as FilterSettingsModel,
    toolbarOptions: [
      { text: '', prefixIcon: 'e-add', id: 'add_icon', tooltipText: 'Add Records' },
      { type: 'Separator' },
      { text: '', prefixIcon: 'sf-icon-expand-collapse', id: 'expand_icon', tooltipText: 'Expand/Collapse' },
      { text: '', prefixIcon: 'sf-icon-clear-sorting', id: 'clearsorting_icon', tooltipText: 'Clear Sorting' },
      { text: '', prefixIcon: 'e-filter-clear icon', id: 'clearfilter_icon', tooltipText: 'Clear Filtering' },
      { type: 'Separator' },
      { text: '', prefixIcon: 'sf-icon-clear-selection', id: 'clear_selection', tooltipText: 'Clear Selection' },
      { type: 'Separator' },
      { text: '', template: menuItemTemplates.gridLineCustomization },
      { type: 'Separator' },
      { text: '', prefixIcon: 'e-csvexport', id: 'export_csv', tooltipText: 'Export CSV' },
      { text: '', prefixIcon: 'e-excelexport', id: 'export_excel', tooltipText: 'Export Excel' },
      { text: '', prefixIcon: 'e-pdfexport', id: 'export_pdf', tooltipText: 'Export PDF' },
      { text: '', template: menuItemTemplates.menuTextboxSearch, align: 'Right' },
      'ColumnChooser',
      { text: '', align: 'Right', id: 'treegrid_properties', template: treegridCommonTemplates.settingsDialogTemplate }
    ] as (ToolbarItems | Object)[],
    pageOptions: { pageCount: 5, pageSizes: [5, 10, 12, 20, 30], pageSize: 30 },
    editOptions: { allowEditing: true, allowAdding: true, allowDeleting: true, showDeleteConfirmDialog: true, 
       mode: "Row" as EditMode
    },
    contextMenuOptions: ['AutoFit', 'AutoFitAll', 'SortAscending', 'SortDescending', 'Copy', 'Edit', 'Delete', 'Save', 'Cancel', 'FirstPage', 'PrevPage',
      'LastPage', 'NextPage' ] as ContextMenuItem[],
    columnSelection: {
      allowColumnSelection: true, type: 'Multiple', mode: 'Both', persistSelection: true
    } as SelectionSettingsModel,
    commands: [
      { type: 'Edit', buttonOption: { cssClass: 'e-flat', iconCss: 'e-edit e-icons' } },
      { type: 'Delete', buttonOption: { cssClass: 'e-flat', iconCss: 'e-delete e-icons' } },
      { type: 'Save', buttonOption: { cssClass: 'e-flat', iconCss: 'e-update e-icons' } },
      { type: 'Cancel', buttonOption: { cssClass: 'e-flat', iconCss: 'e-cancel-icon e-icons' } }
    ] as CommandModel[], 
    projectColumns: [
      {
        field: 'StartDate',
        headerText: 'Start Date',
        format: {
          format: "dd/MM/yyyy",
          type: "date"
        },
        type: 'date',
        allowSorting: false,
        width: 150,
        showColumnMenu: false,
        headerTemplate: treegridCommonTemplates.startDateTemplate,
        headerTextAlign:"Right",
        textAlign: 'Right',
        edit:dateParams,
        validationRules: dateRules,
        filterBarTemplate: treegridFilterTemplates.templateOptionsDatePicker,
        editType: "datepickeredit",
        minWidth: 140,
        maxWidth: 200
      },
      {
        field: 'EndDate',
        headerText: 'End Date',
        allowSorting: false,
        allowFiltering: false,
        headerTemplate: treegridCommonTemplates.endDateTemplate,
        showColumnMenu: false,
        format: {
          format: "dd/MM/yyyy",
          type: "date"
        },
        type: 'date',
        width: 210,
        textAlign: 'Right',
        headerTextAlign:"Right",
        edit:dateParams,
        validationRules: dateRules,
        editType: "datepickeredit",
        filterTemplate: treegridFilterTemplates.filterTemplate,
        minWidth: 200,
        maxWidth: 250
      },
      {
        field: 'Duration',
        width: 120,
        textAlign: 'Right',
        showColumnMenu: false,
        allowFiltering: false,
        allowSorting: false,
        headerTemplate: treegridCommonTemplates.durationTemplate,
        validationRules: durationIDRules,
        filterTemplate: treegridFilterTemplates.filterTemplate,
        editType: "numericedit",
        minWidth: 50,
        maxWidth: 200
      }
    ] as ColumnModel[],
  };

  
  const initialTreeGridRender: JSX.Element = useMemo(() => {
    return (
      <TreeGridComponent ref={(treegrid: TreeGridComponent | null) => {
        if (treegrid) {
          treegridInst = treegrid;
        }
      }} id="overviewtreegrid"
        dataSource={projectDetails}
        enableAltRow={false}
        gridLines={'Both'}
        height={'100%'} width={"100%"}
        allowPaging={true}
        showColumnChooser={true}
        allowReordering={true}
        allowFiltering={true}
        allowPdfExport={true}
        enableRtl={false}
        allowExcelExport={true}
        allowRowDragAndDrop={false}
        allowTextWrap={false}
        allowSorting={true}
        allowSelection={true}
        enableAutoFill={false}
        rowHeight={40}
        treeColumnIndex={1}
        allowResizing={true}
        idMapping="TaskID"
        parentIdMapping="ParentID"
        filterSettings={treegridProperties.filterOptions}
        toolbar={treegridProperties.toolbarOptions}
        pageSettings={treegridProperties.pageOptions}
        editSettings={treegridProperties.editOptions}
        contextMenuItems={treegridProperties.contextMenuOptions}
        selectionSettings={treegridProperties.columnSelection}
        actionBegin={handleTreeGridEvent.actionBegin}
        toolbarClick={handleTreeGridEvent.toolbarClick}
        created={handleTreeGridEvent.onTreeGridCreated}
        excelExportComplete={handleTreeGridEvent.exportComplete}
      >
        <ColumnsDirective>
          <ColumnDirective type='checkbox' width={40} allowEditing={false} minWidth={35} maxWidth={80} />
          <ColumnDirective field="TaskID" headerTextAlign='Center' validationRules={taskIDRules} disableHtmlEncode={false} isPrimaryKey={true} minWidth={135} width={145} maxWidth={165} filterBarTemplate={treegridFilterTemplates.taskIDFilter} headerText="Task ID" template={customComponentTemplates.taskTemplate} />
          <ColumnDirective field="TaskName" headerTextAlign="Center" validationRules={taskNameRules} allowFiltering={true} filterBarTemplate={treegridFilterTemplates.taskNameFilter} allowSorting={false} showColumnMenu={false} headerTemplate={treegridCommonTemplates.taskNameSettings} width={200} minWidth={190} maxWidth={220} />
          <ColumnDirective headerText='Project Details' textAlign='Center' headerTextAlign="Center" columns={treegridProperties.projectColumns} />
          <ColumnDirective field="Progress" validationRules={costRules} allowSorting={false} headerTextAlign="Center" showColumnMenu={false} headerTemplate={treegridCommonTemplates.progressSettings} headerText="Progress (%)" template={treegridCommonTemplates.progressTemplate} width={170} minWidth={160} maxWidth={200} filterTemplate={treegridFilterTemplates.filterTemplate} />
          <ColumnDirective field="Priority" headerTextAlign="Center" minWidth={120} maxWidth={270} width={190} textAlign="Center" filterTemplate={treegridFilterTemplates.filterTemplate} editType='dropdownedit' template={treegridCommonTemplates.priorityTemplate} />
          <ColumnDirective field="EstimatedCost" validationRules={costRules} format="C0" allowSorting={false} type='number' textAlign='Right' headerTextAlign="Center" showColumnMenu={false} headerTemplate={treegridCommonTemplates.estimatedCostSettings} width={150} minWidth={60} maxWidth={250} filterBarTemplate={treegridFilterTemplates.templateOptionsCostTextBox} />
          <ColumnDirective field="ActualCost" validationRules={costRules} allowSorting={false} format="C0" type='number' textAlign='Right' headerTextAlign="Center" showColumnMenu={false} headerTemplate={treegridCommonTemplates.actualCostSettings} width={150} minWidth={60} maxWidth={250} filterBarTemplate={treegridFilterTemplates.templateOptionsCostTextBox} />
          <ColumnDirective field="CostDifference" validationRules={costRules} headerTextAlign="Center" headerText='Cost Comparison' width={180} minWidth={155} maxWidth={250} template={treegridCommonTemplates.costComparisonTemplate}></ColumnDirective>
          <ColumnDirective headerText='Command' filterTemplate={treegridFilterTemplates.filterTemplate} freeze="Right" headerTextAlign="Center" textAlign='Center' width={120} minWidth={110} maxWidth={250} commands={treegridProperties.commands} />
        </ColumnsDirective>
        <AggregatesDirective>
          <AggregateDirective showChildSummary={false}>
            <AggregateColumnsDirective>
              <AggregateColumnDirective field='EndDate' type='Max' format={{ format: "dd/MM/yyyy", type: "date" }} footerTemplate={treegridAggregateTemplates.footerCountTemplate}> </AggregateColumnDirective>
              <AggregateColumnDirective field='Priority' type='Custom' customAggregate={treegridAggregateTemplates.customAggregateFunction} footerTemplate={treegridAggregateTemplates.footerPriorityTemplate}></AggregateColumnDirective>
            </AggregateColumnsDirective>
          </AggregateDirective>
        </AggregatesDirective>
        <Inject services={[Sort, RowDD, Aggregate, CommandColumn, Edit, ContextMenu, ColumnMenu, VirtualScroll, Filter, Page, PdfExport, ExcelExport, Freeze, Reorder, Resize, Toolbar, ColumnChooser]} />
      </TreeGridComponent>
    )
  }, []);

  return (
    <div id="overalContainer" onClick={(e: any) => { removeWalkthrough(e) }}>
      <div className="App">
        <AppBarComponent colorMode="Dark" cssClass="appbar">
          <div className="syncfusion-logo">
            <a className="sync-logo-img" title="Syncfusion" aria-label="Syncfusion logo" href="https://www.syncfusion.com/">
            </a>
          </div>
          <div className="e-appbar-separator"></div>
          <div>
            <span className="title">Feature Rich React Tree Grid</span>
          </div>

          {isDesktop && (
            <>
              <div id="github" className="desktop-only">
                <span className="githubdemo"> <span> <i className="fab fa-github"></i> </span>
                  <a href="https://github.com/SyncfusionExamples/React-Feature-Rich-TreeGrid" target="_blank" rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'white', fontSize: '15px' }}>GitHub</a></span>
              </div>

              <div id="menu" className="desktop-only">
                <MenuComponent id="listmenu" ref={(list: any) => menuRef = list}
                  items={menuItems}
                  showItemOnClick={true}
                  fields={menuAppBarFields}
                  template={menuTemplate}
                  cssClass="e-template-menu"
                  onOpen={() => {
                      isMenuDesktopOpened = true;
                  }}
                ></MenuComponent>
              </div>
              <div id="demo" className="desktop-only">
                <a
                  id="book-free-demo" target="_blank"
                  href="https://www.syncfusion.com/request-demo"
                >
                  <span className="bookdemo">BOOK A FREE DEMO</span>
                </a>
              </div>
              <div id="tryfreebutton" className="desktop-only">
                <a
                  id="download-now-button" target="_blank"
                  href="https://www.syncfusion.com/downloads/react?tag=es-livesample-react-featurerich-treegrid"
                  className="menu-item btn btn--primary"
                >
                  <span className="tryfree">TRY IT FREE</span>
                </a>
              </div>
            </>
          )}

          {/* Hamburger icon for mobile */}
          <div className="hamburger mobile-only"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen)
            }
            }
          >
            ☰
          </div>

        </AppBarComponent >

        {/* Popup menu for mobile */}

        { mobileMenuOpen && (<div className="popup-menu mobile-only">

          <div id="github" className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="githubdemo" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '2px', color: 'white' }}>
                <i className="fab fa-github"></i>
              </span>
              <a
                href="https://github.com/SyncfusionExamples/React-Feature-Rich-Grid"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'white', fontSize: '15px', marginLeft: '5px' }}>GitHub</a></span>
          </div> <hr className="separator-line-mobile" />
          <div id="menumobile" className="mobile-only">
            <MenuComponent id="listmenu" ref={(list: any) => menuMobileRef = list}
              items={menuItems}
              showItemOnClick={true}
              enableScrolling={true}
              fields={menuAppBarFields}
              template={menuTemplate}
              cssClass="e-template-menu"
              onOpen={() => {
                isMenuMobileOpened = true;
              }}
              beforeOpen={(e) => {
                if (e.parentItem.category === 'LEARNING') {
                  (closest(e.element, '.e-menu-wrapper') as HTMLElement).style.height = '250px';
                }
                const menuWrapper = document.getElementById("menumobile");
                if (menuWrapper) {
                  (menuWrapper as HTMLElement).style.setProperty('height', '300px', 'important');
                }
              }}
              beforeClose={(e) => {
                const menuWrapper = document.getElementById("menumobile");
                if (menuWrapper) {
                  (menuWrapper as HTMLElement).style.setProperty('height', '');
                }
              }}
            ></MenuComponent>
          </div>
          <hr className="separator-line-mobile" />
          <div id="demo" className="mobile-only">
            <a
              id="book-free-demo" target="_blank"
              href="https://www.syncfusion.com/request-demo"
            >
              <span className="bookdemo">BOOK A FREE DEMO</span>
            </a>
          </div> <hr className="separator-line-mobile" />
          <div className="mobile-only">
            <a
              id="download-now-button" target="_blank"
              href="https://www.syncfusion.com/downloads/react?tag=es-livesample-react-featurerich-treegrid"
              className="btn btn-free bold free-trial-gtag-sep15"
            >
              <span className="tryfree">TRY IT FREE</span>
            </a>
          </div>
        </div>
        )}
      </div>
      <div className='parent-TreeGrid-Container'>
        {initialTreeGridRender}
        {stepIndex >= 0 && stepIndex < steps.length && (
          <>
            <div className="walkthrough-overlay" />
            <div className="walkthrough-tooltip">
              <div
                className={'walkthrough-tooltip-' + steps[stepIndex].arrowPosition}
                style={{
                  top: position.top,
                  left: position.left,
                  display: position.top === 0 && position.left === 0 ? 'none' : 'block',
                  padding: '20px',
                  background: '#f9f9f9',
                  borderRadius: '8px',
                  minWidth: '300px',
                }}
              >
	                <button className="tooltip-close" onClick={closeTooltip}>×</button>

                {/* Slide content with arrows inside */}
                <div className="walkthrough-text" style={{ fontSize: '14px', marginBottom: '20px', position: 'relative', padding: '0 30px' }}>
                  <span className="inner-arrow left-arrow" onClick={prevStep} style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#888',
                    cursor: 'pointer'
                  }}>&#10094;</span>

                  {steps[stepIndex].content}

                  <span className="inner-arrow right-arrow" onClick={nextStep} style={{
                    position: 'absolute',
                    right: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    color: '#888',
                    cursor: 'pointer'
                  }}>&#10095;</span>
                </div>

                {/* Navigation dots */}
                <div
                  className="walkthrough-footer"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '12px',
                    flexDirection: 'column'
                  }}
                >
                  <div
                    className="walkthrough-dots"
                    style={{ display: 'flex', gap: '8px' }}
                  >
                    {steps.map((_, idx) => (
                      <span
                        key={idx}
                        onClick={() => setStepIndex(idx)}
                        className={`walkthrough-dot ${idx === stepIndex ? 'active' : ''}`}
                        style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          backgroundColor: idx === stepIndex ? 'blue' : 'gray',
                          display: 'inline-block',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
  }

export interface KeyDataType { [key: string]: Object; }

interface TreeGridPropertiesConfig {
  groupField?: string;
  dataFields?: FieldSettingsModel;
  id: string;
  label?: string;
  defaultChecked?: boolean;
  type?: string;
  dataSource?: { [key: string]: Object }[] | string[] | number[] | boolean[];
  placeholder?: string;
  method?: Function;
  value?: string;
  marginLeft?: string;
  marginRTL?: string;
  valueTemplate?: Function;
  itemTemplate?: Function;
  disabled?: boolean;
}

interface TreeGridPropertiesConfigurations {
  'Header Settings': TreeGridPropertiesGroup[];
  'Tree Grid Settings': TreeGridPropertiesGroup[];
  'Filter Settings': TreeGridPropertiesGroup[];
  'Edit Settings': TreeGridPropertiesGroup[];
  'Selection Settings': TreeGridPropertiesGroup[];
  'Web Standards': TreeGridPropertiesGroup[];
}

interface TreeGridPropertiesGroup {
  groupField: string;
  items: TreeGridPropertiesConfig[];
}