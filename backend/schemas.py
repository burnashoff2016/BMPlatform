from pydantic import BaseModel, Field


class UserOut(BaseModel):
    id: int
    username: str
    is_admin: bool

    model_config = {
        "from_attributes": True,
    }


class TaskOut(BaseModel):
    id: int
    slug: str
    title: str
    short_description: str
    task_number: int
    theory_block: str
    methodology_block: str
    data_block: str
    results_block: str
    conclusion_block: str
    links_block: str

    model_config = {
        "from_attributes": True,
    }


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class MonitoringKostromaForm(BaseModel):
    age: int = Field(..., ge=16, le=90)
    gender: str
    employment_type: str
    life_quality_score: int = Field(..., ge=1, le=10)
    intent_to_leave: str
    comment: str | None = None


class CrowdsourcingRoadsForm(BaseModel):
    district: str
    issue_type: str
    description: str
    priority: str


class NNGorodIdeyForm(BaseModel):
    category: str
    title: str
    description: str
    expected_impact: str


class KpiSuzdalFeedbackForm(BaseModel):
    service_name: str
    month: str
    wait_time_minutes: int = Field(..., ge=0, le=240)
    satisfaction_score: int = Field(..., ge=1, le=10)
    comment: str | None = None
