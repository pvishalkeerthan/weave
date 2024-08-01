from typing import TYPE_CHECKING, Any, Iterator, Optional

from weave.trace.refs import TableRef

if TYPE_CHECKING:
    import pandas as pd


class Table:
    ref: Optional[TableRef]

    def __init__(self, rows: list) -> None:
        if not isinstance(rows, list):
            try:
                import pandas as pd

                if isinstance(rows, pd.DataFrame):
                    rows = rows.to_dict(orient="records")
            except ImportError:
                pass
        if not isinstance(rows, list):
            raise ValueError(
                "Attempted to construct a Table with a non-list object. Found: "
                + str(type(rows))
            )
        self.rows = rows
        self.ref = None

    def __getitem__(self, key: int) -> dict:
        return self.rows[key]

    def __iter__(self) -> Iterator:
        return iter(self.rows)

    def __eq__(self, other: Any) -> bool:
        return self.rows == other

    def add(self, row: dict) -> None:
        """Add a row to the table."""
        self.rows.append(row)

    def remove(self, index: int) -> None:
        """Remove a row at the given index from the table."""
        self.rows.pop(index)

    def to_pandas(self) -> "pd.DataFrame":
        """Convert the table to a pandas DataFrame."""
        try:
            import pandas as pd
        except ImportError:
            raise ValueError("pandas is not installed")

        return pd.DataFrame(self.rows)
